// Resident settings page.
// This is where the resident controls notification and display preferences.

export function renderSettingsPage(settings) {
  return `
    <section class="page active">
      <div class="page-headline">
        <div>
          <p class="eyebrow">Settings</p>
          <h1>Notification, privacy, and account controls.</h1>
          <p>Resident settings screen added from the left dashboard navigation.</p>
        </div>
      </div>

      <div class="settings-layout">
        <section class="panel">
          <div class="panel-header compact">
            <div class="panel-head-copy">
              <h2>Notification Preferences</h2>
              <p>Choose how the resident receives status changes.</p>
            </div>
          </div>

          <div class="settings-list">
            <label class="setting-item">
              <div class="setting-copy">
                <strong>Status update alerts</strong>
                <span>Receive in-app updates when a report changes status.</span>
              </div>
              <span class="toggle-wrap">
                <input class="toggle-input" type="checkbox" data-setting-key="browserNotifications" ${settings.browserNotifications ? "checked" : ""}>
                <span class="toggle-slider"></span>
              </span>
            </label>

            <label class="setting-item">
              <div class="setting-copy">
                <strong>Admin comment alerts</strong>
                <span>Get notified whenever barangay staff adds feedback.</span>
              </div>
              <span class="toggle-wrap">
                <input class="toggle-input" type="checkbox" data-setting-key="emailNotifications" ${settings.emailNotifications ? "checked" : ""}>
                <span class="toggle-slider"></span>
              </span>
            </label>

            <label class="setting-item">
              <div class="setting-copy">
                <strong>Email summary</strong>
                <span>Send a summary of report updates to your email address.</span>
              </div>
              <span class="toggle-wrap">
                <input class="toggle-input" type="checkbox" data-setting-key="emailSummary" ${settings.emailSummary ? "checked" : ""}>
                <span class="toggle-slider"></span>
              </span>
            </label>
          </div>
        </section>

        <section class="panel privacy-panel">
          <div class="panel-header compact">
            <div class="panel-head-copy">
              <h2>Privacy and Security</h2>
              <p>Resident-safe controls with the same dashboard card treatment.</p>
            </div>
          </div>

          <div class="privacy-list">
            <div class="privacy-item">
              <div>
                <strong>Change Password</strong>
                <span>Update your password regularly for account protection.</span>
              </div>
              <button class="pill-button" type="button" data-action="open-change-password">Edit</button>
            </div>

            <div class="privacy-item">
              <div>
                <strong>Visibility</strong>
                <span>Your reports remain private to your resident account and barangay admins.</span>
              </div>
              <button class="pill-button active" type="button" data-action="toggle-visibility">Private</button>
            </div>

            <div class="privacy-item">
              <div>
                <strong>Log Out</strong>
                <span>Return to the sign in and sign up screens.</span>
              </div>
              <button class="ghost-button" type="button" data-logout="true">Open</button>
            </div>
          </div>
        </section>
      </div>
    </section>
  `;
}
