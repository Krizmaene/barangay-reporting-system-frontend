// Main application controller.
// This file connects routing, storage-backed services, validation, and page rendering.

import { renderPortalLayout } from "../components/layout.js";
import { renderReportModal } from "../components/modal.js";
import { DEFAULT_REPORT_FILTER, ROUTES } from "../utils/constants.js";
import { applyFormErrors, clearFormFeedback, getFormValues, setFormMessage } from "../utils/forms.js";
import { renderAuthPage } from "../pages/authPage.js";
import { renderDashboardPage, renderDashboardRail } from "../pages/dashboardPage.js";
import { renderHistoryPage } from "../pages/historyPage.js";
import { renderMyReportsPage } from "../pages/myReportsPage.js";
import { renderNotificationsPage } from "../pages/notificationsPage.js";
import { renderProfilePage } from "../pages/profilePage.js";
import { renderSettingsPage } from "../pages/settingsPage.js";
import { renderSubmitReportPage } from "../pages/submitReportPage.js";
import { normalizeRoute, getCurrentRoute, navigateTo } from "./router.js";
import { bootstrapResidentPortal } from "../services/bootstrapService.js";
import { getCurrentResident, isResidentEmailTaken, signInResident, signOutResident, signUpResident } from "../services/authService.js";
import { getNotificationBadgeCount, getNotificationsForResident } from "../services/notificationService.js";
import { createResidentReport, getFilteredResidentReports, getRecentReportsPreview, getReportById, getResidentHistory, getResidentReportMetrics } from "../services/reportService.js";
import { getResidentSettings, updateResidentSetting } from "../services/settingsService.js";
import { clearReportDraft, getReportDraft, saveReportDraft } from "../services/draftService.js";
import { validateSignIn, validateSignUp } from "../validation/authValidators.js";
import { validateReportForm } from "../validation/reportValidators.js";

const appState = {
  reportFilter: DEFAULT_REPORT_FILTER,
  modalReportId: null,
  toastMessage: "",
  toastTimeoutId: null
};

let rootElement = null;
let listenersBound = false;

export function startResidentPortal() {
  bootstrapResidentPortal();
  rootElement = document.getElementById("app");

  if (!listenersBound) {
    bindGlobalEvents();
    listenersBound = true;
  }

  ensureValidRoute();
  renderApp();
}

function ensureValidRoute() {
  const currentUser = getCurrentResident();
  const currentRoute = getCurrentRoute();
  const expectedRoute = normalizeRoute(currentRoute, Boolean(currentUser));

  if (expectedRoute !== currentRoute) {
    navigateTo(expectedRoute);
  }
}

function bindGlobalEvents() {
  window.addEventListener("hashchange", () => {
    appState.modalReportId = null;
    renderApp();
  });

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("submit", handleDocumentSubmit);
  document.addEventListener("change", handleDocumentChange);
  document.addEventListener("keydown", handleDocumentKeydown);
}

function handleDocumentClick(event) {
  const routeTrigger = event.target.closest("[data-route]");
  if (routeTrigger) {
    event.preventDefault();
    navigateTo(routeTrigger.dataset.route);
    return;
  }

  const filterTrigger = event.target.closest("[data-status-filter]");
  if (filterTrigger) {
    appState.reportFilter = filterTrigger.dataset.statusFilter;
    renderApp({ preserveScroll: true });
    return;
  }

  const reportTrigger = event.target.closest("[data-open-report]");
  if (reportTrigger) {
    appState.modalReportId = reportTrigger.dataset.openReport;
    renderApp({ preserveScroll: true });
    return;
  }

  const saveDraftTrigger = event.target.closest("[data-action=\"save-report-draft\"]");
  if (saveDraftTrigger) {
    const form = document.querySelector('[data-form="submit-report"]');
    if (form) {
      const values = getFormValues(form);
      saveReportDraft(getCurrentResident().id, values);
      showToast("Draft saved locally.");
      renderApp({ preserveScroll: true });
    }
    return;
  }

  const openPasswordTrigger = event.target.closest("[data-action=\"open-change-password\"]");
  if (openPasswordTrigger) {
    showToast("Change password is not supported in this demo.");
    return;
  }

  const toggleVisibilityTrigger = event.target.closest("[data-action=\"toggle-visibility\"]");
  if (toggleVisibilityTrigger) {
    showToast("Report visibility remains private in this resident portal.");
    return;
  }

  if (event.target.matches("[data-modal-backdrop]") || event.target.closest("[data-close-modal]")) {
    appState.modalReportId = null;
    renderApp({ preserveScroll: true });
    return;
  }

  if (event.target.closest("[data-logout]")) {
    signOutResident();
    appState.reportFilter = DEFAULT_REPORT_FILTER;
    appState.modalReportId = null;
    showToast("Signed out successfully.");
    navigateTo(ROUTES.SIGNIN);
  }
}

function handleDocumentSubmit(event) {
  const form = event.target;

  if (form.matches('[data-form="signin"]')) {
    event.preventDefault();
    clearFormFeedback(form);

    const values = getFormValues(form);
    const errors = validateSignIn(values);

    if (Object.keys(errors).length) {
      applyFormErrors(form, errors);
      return;
    }

    try {
      signInResident(values);
      appState.reportFilter = DEFAULT_REPORT_FILTER;
      showToast("Welcome back.");
      navigateTo(ROUTES.DASHBOARD);
    } catch (error) {
      setFormMessage(form, error.message);
    }

    return;
  }

  if (form.matches('[data-form="signup"]')) {
    event.preventDefault();
    clearFormFeedback(form);

    const values = getFormValues(form);
    const errors = validateSignUp(values, isResidentEmailTaken);

    if (Object.keys(errors).length) {
      applyFormErrors(form, errors);
      return;
    }

    try {
      signUpResident(values);
      appState.reportFilter = DEFAULT_REPORT_FILTER;
      showToast("Account created successfully.");
      navigateTo(ROUTES.DASHBOARD);
    } catch (error) {
      setFormMessage(form, error.message);
    }

    return;
  }

  if (form.matches('[data-form="submit-report"]')) {
    event.preventDefault();
    clearFormFeedback(form);

    const currentUser = getCurrentResident();
    if (!currentUser) {
      navigateTo(ROUTES.SIGNIN);
      return;
    }

    const values = getFormValues(form);
    const errors = validateReportForm(values);

    if (Object.keys(errors).length) {
      applyFormErrors(form, errors);
      return;
    }

    createResidentReport(currentUser.id, values);
    clearReportDraft(currentUser.id);
    appState.reportFilter = DEFAULT_REPORT_FILTER;
    showToast("Report submitted successfully.");
    navigateTo(ROUTES.MY_REPORTS);
  }
}

function handleDocumentChange(event) {
  const toggle = event.target;

  if (!toggle.matches("[data-setting-key]")) {
    return;
  }

  const currentUser = getCurrentResident();
  if (!currentUser) {
    navigateTo(ROUTES.SIGNIN);
    return;
  }

  updateResidentSetting(currentUser.id, toggle.dataset.settingKey, toggle.checked);
  showToast("Settings updated.");
}

function handleDocumentKeydown(event) {
  if (event.key === "Escape" && appState.modalReportId) {
    appState.modalReportId = null;
    renderApp({ preserveScroll: true });
  }
}

function showToast(message) {
  appState.toastMessage = message;
  renderApp({ preserveScroll: true });

  window.clearTimeout(appState.toastTimeoutId);
  appState.toastTimeoutId = window.setTimeout(() => {
    appState.toastMessage = "";
    renderApp({ preserveScroll: true });
  }, 2400);
}

function applyReportVisibilitySettings(reports, settings) {
  if (settings.showResolvedReports) {
    return reports;
  }

  return reports.filter((report) => report.status !== "Resolved");
}

function getPortalMarkup(routeName, currentUser) {
  const settings = getResidentSettings(currentUser.id);
  const metrics = getResidentReportMetrics(currentUser.id);
  const notifications = getNotificationsForResident(currentUser.id);
  const filteredReports = applyReportVisibilitySettings(
    getFilteredResidentReports(currentUser.id, appState.reportFilter),
    settings
  );

  switch (routeName) {
    case ROUTES.SUBMIT_REPORT:
      return {
        pageMarkup: renderSubmitReportPage(currentUser, getReportDraft(currentUser.id) || {}),
        utilityRailMarkup: ""
      };

    case ROUTES.MY_REPORTS:
      return {
        pageMarkup: renderMyReportsPage({
          reports: filteredReports,
          activeFilter: appState.reportFilter
        }),
        utilityRailMarkup: ""
      };

    case ROUTES.HISTORY:
      return {
        pageMarkup: renderHistoryPage(getResidentHistory(currentUser.id)),
        utilityRailMarkup: ""
      };

    case ROUTES.NOTIFICATIONS:
      return {
        pageMarkup: renderNotificationsPage(notifications),
        utilityRailMarkup: ""
      };

    case ROUTES.PROFILE:
      return {
        pageMarkup: renderProfilePage({
          currentUser,
          metrics,
          notificationCount: notifications.length
        }),
        utilityRailMarkup: ""
      };

    case ROUTES.SETTINGS:
      return {
        pageMarkup: renderSettingsPage(settings),
        utilityRailMarkup: ""
      };

    case ROUTES.DASHBOARD:
    default:
      return {
        pageMarkup: renderDashboardPage({
          metrics,
          reports: applyReportVisibilitySettings(getRecentReportsPreview(currentUser.id, 6), settings)
        }),
        utilityRailMarkup: renderDashboardRail({
          currentDate: new Date(),
          notifications: notifications.slice(0, 4)
        })
      };
  }
}

function renderApp({ preserveScroll = false } = {}) {
  if (!rootElement) {
    return;
  }

  const previousScrollY = preserveScroll ? window.scrollY : 0;
  const currentUser = getCurrentResident();
  const rawRoute = getCurrentRoute();
  const activeRoute = normalizeRoute(rawRoute, Boolean(currentUser));

  if (activeRoute !== rawRoute) {
    navigateTo(activeRoute);
    return;
  }

  if (!currentUser) {
    rootElement.innerHTML = renderAuthPage(activeRoute);
  } else {
    const portalMarkup = getPortalMarkup(activeRoute, currentUser);
    const modalReport = appState.modalReportId
      ? getReportById(appState.modalReportId, currentUser.id)
      : null;

    rootElement.innerHTML = renderPortalLayout({
      currentUser,
      activeRoute,
      pageMarkup: portalMarkup.pageMarkup,
      utilityRailMarkup: portalMarkup.utilityRailMarkup,
      modalMarkup: renderReportModal(modalReport),
      notificationCount: getNotificationBadgeCount(currentUser.id),
      toastMessage: appState.toastMessage
    });
  }

  if (preserveScroll) {
    window.scrollTo({ top: previousScrollY, left: 0 });
  } else {
    window.scrollTo({ top: 0, left: 0 });
  }
}
