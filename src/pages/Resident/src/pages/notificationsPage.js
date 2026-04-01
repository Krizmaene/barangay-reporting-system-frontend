// Notifications page.
// This expands the bell icon feed into a full resident notification center.

import { renderEmptyState, renderNotificationCard } from "../components/reportCards.js";

export function renderNotificationsPage(notifications) {
  const notificationMarkup = notifications.length
    ? notifications.map(renderNotificationCard).join("")
    : renderEmptyState("Notifications will appear here when a report status changes or an admin adds feedback.");

  return `
    <section class="page active">
      <div class="page-headline">
        <div>
          <p class="eyebrow">Notifications</p>
          <h1>Status updates and admin comments.</h1>
          <p>Each update below corresponds to one of your submitted reports.</p>
        </div>
      </div>

      <section class="panel">
        <div class="panel-header compact">
          <div class="panel-head-copy">
            <h2>Notification Feed</h2>
            <p>Tap any item to open the related report detail view.</p>
          </div>
        </div>

        <div class="notification-feed">
          ${notificationMarkup}
        </div>
      </section>
    </section>
  `;
}
