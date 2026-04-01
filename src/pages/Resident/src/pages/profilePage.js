// Resident profile page.
// This shows the signed-in resident's identity details and summary counts.

import { formatDateTime } from "../utils/formatters.js";
import { buildInitials, escapeHtml } from "../utils/helpers.js";

export function renderProfilePage({ currentUser, metrics, notificationCount }) {
  return `
    <section class="page active">
      <section class="hero-panel profile-hero">
        <div class="profile-hero-left">
          <span class="avatar xlarge">${escapeHtml(buildInitials(currentUser.fullName))}</span>
          <div>
            <p class="eyebrow">Resident Profile</p>
            <h1>${escapeHtml(currentUser.fullName)}</h1>
            <p class="supporting-copy">Resident account details and personal report summary.</p>
          </div>
        </div>

        <button class="ghost-button profile-logout-button" type="button" data-logout="true">Log Out</button>
      </section>

      <section class="panel">
        <div class="panel-header compact">
          <div class="panel-head-copy">
            <h2>Account Details</h2>
            <p>This information belongs to the current signed-in resident account.</p>
          </div>
        </div>

        <div class="detail-grid">
          <div class="detail-item">
            <span>Full Name</span>
            <strong>${escapeHtml(currentUser.fullName)}</strong>
          </div>
          <div class="detail-item">
            <span>Role</span>
            <strong>Resident</strong>
          </div>
          <div class="detail-item">
            <span>Email Address</span>
            <strong>${escapeHtml(currentUser.email)}</strong>
          </div>
          <div class="detail-item">
            <span>Mobile Number</span>
            <strong>${escapeHtml(currentUser.mobileNumber)}</strong>
          </div>
          <div class="detail-item">
            <span>Purok</span>
            <strong>${escapeHtml(currentUser.purok)}</strong>
          </div>
          <div class="detail-item">
            <span>Created On</span>
            <strong>${escapeHtml(formatDateTime(currentUser.createdAt))}</strong>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header compact">
          <div class="panel-head-copy">
            <h2>Resident Summary</h2>
            <p>Quick totals based on your own submitted concerns.</p>
          </div>
        </div>

        <div class="profile-stat-list">
          <div class="profile-stat">
            <span>Total Reports</span>
            <strong>${escapeHtml(String(metrics.total))}</strong>
          </div>
          <div class="profile-stat">
            <span>Resolved Reports</span>
            <strong>${escapeHtml(String(metrics.resolved))}</strong>
          </div>
          <div class="profile-stat">
            <span>Recent Updates</span>
            <strong>${escapeHtml(String(notificationCount))}</strong>
          </div>
        </div>
      </section>
    </section>
  `;
}
