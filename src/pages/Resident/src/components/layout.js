// Shared portal shell used by all resident pages after login.
// This file owns the top ribbon, left sidebar, right utility rail slot, and toast shell.

import { APP_TITLE, ROUTES } from "../utils/constants.js";
import { buildInitials, escapeHtml } from "../utils/helpers.js";

function renderNavButton(label, routeName, activeRoute) {
  return `
    <button
      class="nav-button ${activeRoute === routeName ? "active" : ""}"
      type="button"
      data-route="${routeName}"
    >
      ${label}
    </button>
  `;
}

function renderToast(message) {
  if (!message) {
    return "";
  }

  return `<div class="toast active">${escapeHtml(message)}</div>`;
}

export function renderPortalLayout({
  currentUser,
  activeRoute,
  pageMarkup,
  utilityRailMarkup,
  modalMarkup,
  notificationCount,
  toastMessage
}) {
  const initials = buildInitials(currentUser.fullName);

  return `
    <section class="portal-screen active">
      <header class="top-ribbon">
        <span class="brand-pill brand-button">${escapeHtml(APP_TITLE)}</span>

        <div class="top-actions">
          <button class="quick-link" type="button" data-route="${ROUTES.MY_REPORTS}">My Reports</button>
          <button class="quick-link" type="button" data-route="${ROUTES.SUBMIT_REPORT}">New Report</button>

          <button class="icon-button" type="button" data-route="${ROUTES.NOTIFICATIONS}" aria-label="Notifications">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-5H5l1.35-1.46a2 2 0 0 0 .55-1.35V10a5.1 5.1 0 0 1 4.1-5V4.5a1 1 0 1 1 2 0V5a5.1 5.1 0 0 1 4.1 5v4.19a2 2 0 0 0 .55 1.35Z" />
            </svg>
            <span class="notification-badge">${escapeHtml(String(notificationCount))}</span>
          </button>

          <button class="profile-button" type="button" data-route="${ROUTES.PROFILE}">
            <span class="avatar">${escapeHtml(initials)}</span>
            <span class="profile-meta">
              <strong>${escapeHtml(currentUser.fullName)}</strong>
              <small>Resident</small>
            </span>
          </button>
        </div>
      </header>

      <div class="portal-layout ${utilityRailMarkup ? "has-rail" : "no-rail"}">
        <aside class="sidebar-card">
          <div class="resident-card">
            <span class="avatar large">${escapeHtml(initials)}</span>
            <div>
              <h3>${escapeHtml(currentUser.fullName)}</h3>
              <p>Resident</p>
            </div>
          </div>

          <nav class="sidebar-nav" aria-label="Resident navigation">
            ${renderNavButton("Dashboard", ROUTES.DASHBOARD, activeRoute)}
            ${renderNavButton("Submit Report", ROUTES.SUBMIT_REPORT, activeRoute)}
            ${renderNavButton("My Reports", ROUTES.MY_REPORTS, activeRoute)}
            ${renderNavButton("History", ROUTES.HISTORY, activeRoute)}
            ${renderNavButton("Settings", ROUTES.SETTINGS, activeRoute)}
          </nav>

          <div class="sidebar-summary">
            <p class="summary-label">Resident Portal Access</p>
            <strong>Private report tracking only</strong>
            <span>You can only view reports submitted from your own account.</span>
          </div>

          <button class="ghost-button sidebar-logout-button" type="button" data-logout="true">Log Out</button>
        </aside>

        <main class="page-stack">
          ${pageMarkup}
        </main>

        ${utilityRailMarkup ? `<aside class="utility-rail">${utilityRailMarkup}</aside>` : ""}
      </div>

      ${modalMarkup}
      ${renderToast(toastMessage)}
    </section>
  `;
}
