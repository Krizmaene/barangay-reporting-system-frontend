// Submit-report page.
// This is the actual resident form where new complaints are created and validated.

import { PUROK_OPTIONS, REPORT_CATEGORIES } from "../utils/constants.js";
import { escapeHtml } from "../utils/helpers.js";

function renderCategoryOptions(selectedCategory) {
  return REPORT_CATEGORIES.map((category) => `
    <option value="${escapeHtml(category)}" ${selectedCategory === category ? "selected" : ""}>${escapeHtml(category)}</option>
  `).join("");
}

function renderPurokOptions(currentPurok) {
  return PUROK_OPTIONS.map((purok) => `
    <option value="${escapeHtml(purok)}" ${currentPurok === purok ? "selected" : ""}>${escapeHtml(purok)}</option>
  `).join("");
}

export function renderSubmitReportPage(currentUser, draft = {}) {
  const selectedCategory = draft.category || "";
  const selectedPurok = draft.purok || currentUser.purok || "";
  const incidentLocation = draft.incidentLocation || "";
  const incidentAt = draft.incidentAt || "";
  const personInvolved = draft.personInvolved || "";
  const description = draft.description || "";
  const preferredUpdateMethod = draft.preferredUpdateMethod || "In App";
  const draftSaved = draft.savedAt ? `Draft saved on ${new Date(draft.savedAt).toLocaleString()}` : "";

  return `
    <section class="page active">
      <div class="page-headline">
        <div>
          <p class="eyebrow">Submit Report</p>
          <h1>File a new resident concern.</h1>
          <p>Complete the details below so the barangay can review your complaint correctly.</p>
        </div>
      </div>

      <div class="content-grid submit-layout">
        <section class="panel form-panel">
          <form data-form="submit-report" novalidate>
            <div class="field-grid">
              <label class="field">
                <span>Report Category</span>
                <select name="category">
                  <option value="">Select category</option>
                  ${renderCategoryOptions(selectedCategory)}
                </select>
                <small class="field-error" data-error-for="category"></small>
              </label>

              <label class="field">
                <span>Purok</span>
                <select name="purok">
                  <option value="">Select purok</option>
                  ${renderPurokOptions(selectedPurok)}
                </select>
                <small class="field-error" data-error-for="purok"></small>
              </label>

              <label class="field full-span">
                <span>Incident Location</span>
                <input name="incidentLocation" type="text" placeholder="Near sari sari store, Sampaguita Street" value="${escapeHtml(incidentLocation)}">
                <small class="field-error" data-error-for="incidentLocation"></small>
              </label>

              <label class="field">
                <span>Date and Time</span>
                <input name="incidentAt" type="datetime-local" value="${escapeHtml(incidentAt)}">
                <small class="field-error" data-error-for="incidentAt"></small>
              </label>

              <label class="field">
                <span>Name of Person Involved</span>
                <input name="personInvolved" type="text" placeholder="Unknown person disposing trash" value="${escapeHtml(personInvolved)}">
                <small class="field-error" data-error-for="personInvolved"></small>
              </label>

              <label class="field full-span">
                <span>Description</span>
                <textarea name="description" rows="6" placeholder="Nakarahrang ...">${escapeHtml(description)}</textarea>
                <small class="field-error" data-error-for="description"></small>
              </label>

              <div class="field full-span">
                <span>Attach Photo</span>
                <label class="file-upload-button">
                  <input name="photo" type="file" accept="image/*" class="file-upload-input">
                  <span>Choose file or photo</span>
                </label>
                <small class="field-error" data-error-for="photo"></small>
                ${draft.photoName ? `<p class="form-note">Saved file: ${escapeHtml(draft.photoName)}</p>` : ""}
              </div>

              <div class="field full-span">
                <span>Preferred Update Method</span>
                <div class="update-method-options">
                  <label class="radio-pill ${preferredUpdateMethod === "In App" ? "active" : ""}">
                    <input type="radio" name="preferredUpdateMethod" value="In App" ${preferredUpdateMethod === "In App" ? "checked" : ""}>
                    In App
                  </label>
                  <label class="radio-pill ${preferredUpdateMethod === "Email" ? "active" : ""}">
                    <input type="radio" name="preferredUpdateMethod" value="Email" ${preferredUpdateMethod === "Email" ? "checked" : ""}>
                    Email
                  </label>
                </div>
              </div>
            </div>

            <p class="form-message" data-form-message></p>
            <p class="form-note">${escapeHtml(draftSaved)}</p>

            <div class="form-actions">
              <button class="ghost-button" type="button" data-action="save-report-draft">Save Draft</button>
              <button class="primary-button" type="submit">Submit Report</button>
            </div>
          </form>
        </section>

        <section class="panel guide-panel">
          <div class="panel-header compact">
            <div class="panel-head-copy">
              <h2>Submission Guide</h2>
              <p>Short resident instructions to make the reporting experience clearer and more standard.</p>
            </div>
          </div>

          <div class="guide-list">
            <div class="guide-item">
              <strong>Use the exact location</strong>
              <span>Include landmarks, street name, or purok for faster barangay action.</span>
            </div>
            <div class="guide-item">
              <strong>Describe what happened</strong>
              <span>State the issue clearly and mention who or what is involved when applicable.</span>
            </div>
            <div class="guide-item">
              <strong>Attach supporting proof</strong>
              <span>Photos are optional but helpful for trash, drainage, and damaged property concerns.</span>
            </div>
            <div class="guide-item">
              <strong>Track updates privately</strong>
              <span>Only your resident account and authorized barangay admins can view your report.</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  `;
}
