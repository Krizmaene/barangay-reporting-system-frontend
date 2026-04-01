// Central application constants used across routing, validation, storage, and UI labels.
// Keeping these values in one file makes it easier to update shared behavior later.

export const APP_TITLE = "Barangay Mataas na Lupa Monitoring";
export const AXIOS_VERSION = "1.13.6";

// Local storage keys for the resident-side frontend.
export const STORAGE_KEYS = {
  users: "barangay.users",
  session: "barangay.session",
  reports: "barangay.reports",
  settings: "barangay.settings",
  reportDrafts: "barangay.reportDrafts",
  seedVersion: "barangay.seedVersion"
};

// Seed version lets us detect whether the initial demo data was already prepared.
export const SEED_VERSION = "resident-frontend-v1";

// Resident routes for the single-page frontend.
export const ROUTES = {
  SIGNIN: "signin",
  SIGNUP: "signup",
  DASHBOARD: "dashboard",
  SUBMIT_REPORT: "submit-report",
  MY_REPORTS: "my-reports",
  HISTORY: "history",
  NOTIFICATIONS: "notifications",
  PROFILE: "profile",
  SETTINGS: "settings"
};

export const AUTH_ROUTES = [ROUTES.SIGNIN, ROUTES.SIGNUP];
export const DEFAULT_REPORT_FILTER = "all";

// Shared dropdown/filter options used by the resident forms and report views.
export const REPORT_STATUSES = ["Pending", "In Progress", "Resolved"];
export const REPORT_CATEGORIES = [
  "Trash Complaint",
  "Noise Complaint",
  "Broken Streetlight",
  "Drainage Concern",
  "Public Disturbance",
  "Water Leak"
];
export const PUROK_OPTIONS = [
  "Purok 1",
  "Purok 2",
  "Purok 3",
  "Purok 4",
  "Purok 5",
  "Purok 6"
];

// Default resident settings shown on the Settings screen.
export const DEFAULT_SETTINGS = {
  emailNotifications: true,
  browserNotifications: true,
  emailSummary: false,
  showResolvedReports: true,
  compactHistory: false
};
