// Reusable card templates for the resident dashboard, My Reports, History, and Notifications.
// The detailed comments point to the exact screen area each template is responsible for.

import { formatDateTime, formatReportMetaLine } from "../utils/formatters.js";
import { escapeHtml, statusToClass } from "../utils/helpers.js";

function renderArrowIcon() {
  return `
    <span class="icon-link" aria-hidden="true">
      <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
        <path d="M7 5.5 11.5 10 7 14.5" />
      </svg>
    </span>
  `;
}

// Dashboard / My Reports card and My Reports page card.
// This is the resident report tile with:
// 1. report title
// 2. tiny date-time-location line
// 3. short description preview
// 4. status + category chips
// 5. arrow action on the right
export function renderReportCard(report) {
  return `
    <button class="report-card" type="button" data-open-report="${escapeHtml(report.id)}">
      <div class="report-copy">
        <h3>${escapeHtml(report.title)}</h3>
        <p class="report-subtext">${escapeHtml(formatReportMetaLine(report.createdAt, report.incidentLocation))}</p>
      </div>
      <p class="card-snippet">${escapeHtml(report.description)}</p>
      <div class="card-footer">
        <div class="report-tags">
          <span class="meta-chip ${statusToClass(report.status)}">${escapeHtml(report.status)}</span>
          <span class="meta-chip">${escapeHtml(report.category)}</span>
        </div>
        ${renderArrowIcon()}
      </div>
    </button>
  `;
}

// Dashboard / Recent Updates card.
// The report title stays small at the top, while the actual update title is the main message.
export function renderUpdateCard(update) {
  return `
    <button class="update-card" type="button" data-open-report="${escapeHtml(update.reportId)}">
      <div class="update-copy">
        <p class="update-report-title">${escapeHtml(update.reportTitle)}</p>
        <h3>${escapeHtml(update.title)}</h3>
      </div>
      <div class="card-footer">
        <div class="update-tags">
          <span class="meta-chip ${statusToClass(update.status)}">${escapeHtml(update.status)}</span>
          <span class="meta-chip">${escapeHtml(update.category)}</span>
        </div>
        ${renderArrowIcon()}
      </div>
    </button>
  `;
}

// History screen card.
// This shows the report title, current status, metadata chips, summary text, and the View pill.
export function renderHistoryCard(report) {
  const latestUpdate = report.latestUpdate;

  return `
    <button class="timeline-card" type="button" data-open-report="${escapeHtml(report.id)}">
      <div class="history-header">
        <h3>${escapeHtml(report.title)}</h3>
        <span class="meta-chip ${statusToClass(report.status)}">${escapeHtml(report.status)}</span>
      </div>
      <div class="timeline-meta">
        <span class="meta-chip">${escapeHtml(formatDateTime(report.createdAt))}</span>
        <span class="meta-chip">${escapeHtml(report.id)}</span>
        <span class="meta-chip">${escapeHtml(report.purok)}</span>
      </div>
      <p class="history-summary">${escapeHtml(latestUpdate?.message || "No update yet for this report.")}</p>
      <div class="history-card-footer">
        <span class="pill-button history-view-pill">View</span>
      </div>
    </button>
  `;
}

// Notifications page card.
// This is the fuller version of dashboard updates, with message and timestamp included.
export function renderNotificationCard(notification) {
  return `
    <button class="notification-card" type="button" data-open-report="${escapeHtml(notification.reportId)}">
      <span class="avatar">J</span>
      <div class="notification-body">
        <p class="update-report-title">${escapeHtml(notification.reportTitle)}</p>
        <h3>${escapeHtml(notification.title)}</h3>
        <p>${escapeHtml(notification.message)}</p>
        <div class="activity-meta">
          <span>${escapeHtml(formatDateTime(notification.createdAt))}</span>
        </div>
      </div>
      <span class="notification-marker"></span>
    </button>
  `;
}

// Empty-state helper for panels that currently have no data to render.
export function renderEmptyState(message) {
  return `
    <div class="empty-state">
      <strong>No items to show yet.</strong>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}
