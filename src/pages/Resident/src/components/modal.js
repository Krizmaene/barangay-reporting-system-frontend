// Report detail modal shared by the dashboard, My Reports, History, and Notifications.
// Clicking any report card opens this same modal with the selected report data.

import { formatDateTime } from "../utils/formatters.js";
import { escapeHtml, statusToClass } from "../utils/helpers.js";

export function renderReportModal(report) {
  if (!report) {
    return "";
  }

  const commentMarkup = report.adminComments.length
    ? report.adminComments.map((comment) => `
        <div class="comment-item">
          <strong>${escapeHtml(comment.author)}</strong>
          <p>${escapeHtml(comment.text)}</p>
          <span>${escapeHtml(formatDateTime(comment.createdAt))}</span>
        </div>
      `).join("")
    : `
      <div class="comment-item">
        <strong>No admin comments yet</strong>
        <p>The barangay admin has not posted feedback on this report yet.</p>
      </div>
    `;

  const timelineMarkup = [...report.timeline].sort((left, right) => {
    return new Date(right.createdAt) - new Date(left.createdAt);
  }).map((entry) => `
    <div class="comment-item">
      <strong>${escapeHtml(entry.title)}</strong>
      <p>${escapeHtml(entry.message)}</p>
      <span>${escapeHtml(formatDateTime(entry.createdAt))}</span>
    </div>
  `).join("");

  return `
    <div class="modal-backdrop active" data-modal-backdrop="true">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <div class="modal-title-wrap">
            <h2 id="modal-title">${escapeHtml(report.title)}</h2>
            <span class="status-badge ${statusToClass(report.status)}">${escapeHtml(report.status)}</span>
          </div>
          <button class="pill-button" type="button" data-close-modal="true">Close</button>
        </div>

        <div class="modal-detail-grid">
          <div class="detail-item">
            <span>Report ID</span>
            <strong>${escapeHtml(report.id)}</strong>
          </div>
          <div class="detail-item">
            <span>Purok</span>
            <strong>${escapeHtml(report.purok)}</strong>
          </div>
          <div class="detail-item">
            <span>Date Filed</span>
            <strong>${escapeHtml(formatDateTime(report.createdAt))}</strong>
          </div>
          <div class="detail-item">
            <span>Resident</span>
            <strong>Current signed-in resident</strong>
          </div>
          <div class="detail-item">
            <span>Location</span>
            <strong>${escapeHtml(report.incidentLocation)}</strong>
          </div>
          <div class="detail-item">
            <span>Preferred Update</span>
            <strong>${escapeHtml(report.preferredUpdateMethod || "In App")}</strong>
          </div>
          <div class="detail-item">
            <span>Attached Photo</span>
            <strong>${escapeHtml(report.photoName || "No photo attached")}</strong>
          </div>
          <div class="detail-item">
            <span>Person Involved</span>
            <strong>${escapeHtml(report.personInvolved)}</strong>
          </div>
        </div>

        <div class="modal-block">
          <span>Description</span>
          <p>${escapeHtml(report.description)}</p>
        </div>

        <div class="modal-block">
          <div class="modal-section-header">
            <span>Report Updates</span>
            <strong>${escapeHtml(String(report.timeline.length))} total</strong>
          </div>
          <div class="modal-comments">${timelineMarkup}</div>
        </div>

        <div class="modal-block">
          <div class="modal-section-header">
            <span>Barangay Admin Feedback</span>
            <strong>${escapeHtml(String(report.adminComments.length))} total</strong>
          </div>
          <div class="modal-comments">${commentMarkup}</div>
        </div>
      </div>
    </div>
  `;
}
