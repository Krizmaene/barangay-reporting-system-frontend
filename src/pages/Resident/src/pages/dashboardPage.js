// Resident dashboard page.
// This file owns:
// 1. the blue hero with analytics cards
// 2. the dashboard "My Reports" preview
// 3. the right-side calendar and "Recent Updates" rail

import { renderEmptyState, renderReportCard, renderUpdateCard } from "../components/reportCards.js";
import { formatCalendarMonth, formatLongDate } from "../utils/formatters.js";
import { escapeHtml } from "../utils/helpers.js";

function renderMetricCard(label, value) {
  return `
    <div class="metric-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
    </div>
  `;
}

function buildCalendarCells(referenceDate) {
  const date = new Date(referenceDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let index = 0; index < firstDayOfMonth; index += 1) {
    cells.push(`<span class="calendar-empty" aria-hidden="true"></span>`);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const isSelected = day === date.getDate();
    cells.push(`
      <button type="button" class="${isSelected ? "selected" : ""}">
        ${day}
      </button>
    `);
  }

  return cells.join("");
}

export function renderDashboardPage({ metrics, reports }) {
  const reportMarkup = reports.length
    ? reports.map(renderReportCard).join("")
    : renderEmptyState("Your submitted reports will appear here after you send a complaint.");

  return `
    <section class="page active">
      <section class="hero-panel">
        <div class="hero-main">
          <div class="hero-copy-wrap">
            <p class="eyebrow">Resident Dashboard</p>
            <h1>Resident Reporting Dashboard</h1>
            <p class="supporting-copy">
              Submit concerns, track progress, and receive barangay feedback in one private resident workspace.
            </p>
          </div>

          <div class="metric-grid hero-metrics">
            ${renderMetricCard("Total Reports", metrics.total)}
            ${renderMetricCard("Pending", metrics.pending)}
            ${renderMetricCard("In Progress", metrics.inProgress)}
            ${renderMetricCard("Resolved", metrics.resolved)}
          </div>
        </div>
      </section>

      <section class="panel dashboard-wide-panel">
        <div class="panel-header compact">
          <div class="panel-head-copy">
            <h2>My Reports</h2>
            <p>Short overview of your open and recently resolved complaints.</p>
          </div>
          <button class="pill-button" type="button" data-route="my-reports">View</button>
        </div>

        <div class="report-preview-list">
          ${reportMarkup}
        </div>
      </section>
    </section>
  `;
}

export function renderDashboardRail({ currentDate, notifications }) {
  const updatesMarkup = notifications.length
    ? notifications.map(renderUpdateCard).join("")
    : renderEmptyState("Recent report updates will appear here after the barangay reviews your submissions.");

  return `
    <section class="utility-card calendar-card">
      <p class="eyebrow">Calendar</p>
      <h3>${escapeHtml(formatLongDate(currentDate))}</h3>
      <p class="calendar-month-label">${escapeHtml(formatCalendarMonth(currentDate))}</p>

      <div class="calendar-grid calendar-weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div class="calendar-grid calendar-days">
        ${buildCalendarCells(currentDate)}
      </div>
    </section>

    <section class="utility-card updates-card">
      <div class="panel-header compact">
        <div class="panel-head-copy">
          <h3>Recent Updates</h3>
          <p>Latest changes from your submissions.</p>
        </div>
        <button class="pill-button" type="button" data-route="notifications">View</button>
      </div>

      <div class="utility-feed">
        ${updatesMarkup}
      </div>
    </section>
  `;
}
