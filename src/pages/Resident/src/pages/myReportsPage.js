// My Reports page.
// This is the full resident report list with status filters and expandable report cards.

import { renderEmptyState, renderReportCard } from "../components/reportCards.js";
import { DEFAULT_REPORT_FILTER, REPORT_STATUSES } from "../utils/constants.js";
import { escapeHtml } from "../utils/helpers.js";

function renderFilterButton(label, value, activeFilter) {
  return `
    <button
      class="pill-button ${activeFilter === value ? "active" : ""}"
      type="button"
      data-status-filter="${escapeHtml(value)}"
    >
      ${escapeHtml(label)}
    </button>
  `;
}

export function renderMyReportsPage({ reports, activeFilter }) {
  const reportMarkup = reports.length
    ? reports.map(renderReportCard).join("")
    : renderEmptyState("There are no reports that match the selected filter right now.");

  return `
    <section class="page active">
      <div class="page-headline">
        <div>
          <p class="eyebrow">My Reports</p>
          <h1>Track the status of your submitted reports.</h1>
          <p>You can only see the complaints filed from your own resident account.</p>
        </div>
      </div>

      <section class="panel">
        <div class="panel-header">
          <div class="panel-head-copy">
            <h2>Report List</h2>
            <p>Filter your complaints by their current status.</p>
          </div>

          <div class="filter-row">
            ${renderFilterButton("All", DEFAULT_REPORT_FILTER, activeFilter)}
            ${REPORT_STATUSES.map((status) => renderFilterButton(status, status.toLowerCase(), activeFilter)).join("")}
          </div>
        </div>

        <div class="report-card-grid">
          ${reportMarkup}
        </div>
      </section>
    </section>
  `;
}
