// Resident authentication screen.
// This file renders both the sign-in tab and the create-account tab.

import { APP_TITLE, PUROK_OPTIONS, ROUTES } from "../utils/constants.js";
import { escapeHtml } from "../utils/helpers.js";

function renderPurokOptions() {
  return PUROK_OPTIONS.map((purok) => `
    <option value="${escapeHtml(purok)}">${escapeHtml(purok)}</option>
  `).join("");
}

function renderSignInPanel(isActive) {
  return `
    <form class="auth-panel ${isActive ? "active" : ""}" data-form="signin" novalidate>
      <div class="auth-heading">
        <h2>Sign In</h2>
        <p>Resident-only login for private report tracking and updates.</p>
      </div>

      <div class="field-grid">
        <label class="field full-span">
          <span>Email Address</span>
          <input name="email" type="email" autocomplete="email" placeholder="Enter your email address">
          <small class="field-error" data-error-for="email"></small>
        </label>

        <label class="field full-span">
          <span>Password</span>
          <input name="password" type="password" autocomplete="current-password" placeholder="Enter your password">
          <small class="field-error" data-error-for="password"></small>
        </label>
      </div>

      <p class="form-message" data-form-message></p>
      <button class="primary-button full-width" type="submit">Sign In</button>

      <p class="form-note">
        Demo resident account: <strong>juandelacruz@gmail.com</strong> / <strong>Resident123!</strong>
      </p>
    </form>
  `;
}

function renderSignUpPanel(isActive) {
  return `
    <form class="auth-panel ${isActive ? "active" : ""}" data-form="signup" novalidate>
      <div class="auth-heading">
        <h2>Create Account</h2>
        <p>Create a resident account to submit complaints and monitor updates.</p>
      </div>

      <div class="field-grid">
        <label class="field">
          <span>Full Name</span>
          <input name="fullName" type="text" autocomplete="name" placeholder="Juan Dela Cruz">
          <small class="field-error" data-error-for="fullName"></small>
        </label>

        <label class="field">
          <span>Purok</span>
          <select name="purok">
            <option value="">Select your purok</option>
            ${renderPurokOptions()}
          </select>
          <small class="field-error" data-error-for="purok"></small>
        </label>

        <label class="field">
          <span>Email Address</span>
          <input name="email" type="email" autocomplete="email" placeholder="juandelacruz@gmail.com">
          <small class="field-error" data-error-for="email"></small>
        </label>

        <label class="field">
          <span>Mobile Number</span>
          <input name="mobileNumber" type="tel" autocomplete="tel" placeholder="09171234567">
          <small class="field-error" data-error-for="mobileNumber"></small>
        </label>

        <label class="field">
          <span>Password</span>
          <input name="password" type="password" autocomplete="new-password" placeholder="Create a password">
          <small class="field-error" data-error-for="password"></small>
        </label>

        <label class="field">
          <span>Confirm Password</span>
          <input name="confirmPassword" type="password" autocomplete="new-password" placeholder="Repeat the password">
          <small class="field-error" data-error-for="confirmPassword"></small>
        </label>
      </div>

      <p class="form-message" data-form-message></p>
      <button class="primary-button full-width" type="submit">Create Account</button>
    </form>
  `;
}

export function renderAuthPage(activeRoute) {
  const signInActive = activeRoute === ROUTES.SIGNIN;

  return `
    <section class="auth-screen active">
      <div class="auth-layout">
        <div class="auth-promo">
          <div>
            <span class="brand-pill">${escapeHtml(APP_TITLE)}</span>
            <p class="eyebrow">Resident Access</p>
            <h1>Safe, guided reporting for every barangay resident.</h1>
            <p class="supporting-copy">
              Submit concerns, track progress, and receive barangay updates using a resident-only portal designed for clear and simple reporting.
            </p>
          </div>

          <div class="promo-card-grid">
            <div class="promo-card">
              <strong>Submit concerns</strong>
              <span>File complaints for trash, noise, streetlights, drainage, and other community issues.</span>
            </div>
            <div class="promo-card">
              <strong>Track updates</strong>
              <span>Residents only see their own reports, status changes, and barangay comments.</span>
            </div>
            <div class="promo-card">
              <strong>Receive notices</strong>
              <span>Notifications highlight new admin feedback and report-status changes.</span>
            </div>
          </div>
        </div>

        <div class="auth-card">
          <div class="auth-tabs">
            <button class="auth-tab ${signInActive ? "active" : ""}" type="button" data-route="${ROUTES.SIGNIN}">Sign In</button>
            <button class="auth-tab ${signInActive ? "" : "active"}" type="button" data-route="${ROUTES.SIGNUP}">Create Account</button>
          </div>

          ${renderSignInPanel(signInActive)}
          ${renderSignUpPanel(!signInActive)}
        </div>
      </div>
    </section>
  `;
}
