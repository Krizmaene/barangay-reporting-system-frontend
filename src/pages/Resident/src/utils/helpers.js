// Shared helper utilities for text cleanup, IDs, safe HTML output, and CSS-friendly values.

const HTML_ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

// Escapes user-entered text before it is inserted into templates.
// This keeps the frontend safer when rendering values from forms/localStorage.
export function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ESCAPE_MAP[character]);
}

// Creates a deep copy for seed data so the original seed objects stay untouched.
export function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

// Normalizes text from forms by trimming and collapsing repeated spaces.
export function normalizeText(value = "") {
  return String(value).trim().replace(/\s+/g, " ");
}

// Creates a short avatar label like "JD" from the resident's name.
export function buildInitials(fullName = "Resident User") {
  const parts = normalizeText(fullName).split(" ").filter(Boolean);
  return parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("");
}

// Converts labels like "In Progress" into CSS classes like "in-progress".
export function statusToClass(status = "") {
  return String(status).toLowerCase().replace(/\s+/g, "-");
}

// Small unique ID helper for reports, comments, and timeline entries.
export function uid(prefix = "id") {
  const random = Math.random().toString(36).slice(2, 8);
  const stamp = Date.now().toString(36).slice(-6);
  return `${prefix}-${random}${stamp}`;
}

// Generates the next report ID in the BR-YYYY-001 format used across the resident UI.
export function getNextReportId(reports = [], dateValue = new Date()) {
  const year = new Date(dateValue).getFullYear();
  const maxNumber = reports.reduce((currentMax, report) => {
    const match = String(report.id || "").match(/-(\d{3,})$/);
    return match ? Math.max(currentMax, Number(match[1])) : currentMax;
  }, 0);

  return `BR-${year}-${String(maxNumber + 1).padStart(3, "0")}`;
}

// Sort callback that keeps the newest records first.
export function sortByNewest(items = [], key = "createdAt") {
  return [...items].sort((left, right) => new Date(right[key]) - new Date(left[key]));
}
