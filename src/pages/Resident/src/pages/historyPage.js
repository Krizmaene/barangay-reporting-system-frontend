// History page.
// This screen gives the resident a report-by-report history view with the latest update summary.

import { renderEmptyState, renderHistoryCard } from "../components/reportCards.js";

export function renderHistoryPage(historyItems) {
  const timelineMarkup = historyItems.length
    ? historyItems.map(renderHistoryCard).join("")
    : renderEmptyState("Your report history will appear here after you submit a complaint.");

  return `
    <section class="page active">
      <div class="page-headline">
        <div>
          <p class="eyebrow">History</p>
          <h1>Review your report history.</h1>
          <p>Open any card to view full details, report updates, and admin feedback.</p>
        </div>
      </div>

      <section class="panel">
        <div class="panel-header compact">
          <div class="panel-head-copy">
            <h2>Submitted Reports</h2>
            <p>Every report listed here belongs only to your account.</p>
          </div>
        </div>

        <div class="history-timeline">
          ${timelineMarkup}
        </div>
      </section>
    </section>
  `;
}
