// Frontend entry file.
// This starts the modular resident app after the base HTML is loaded.

import { startResidentPortal } from "./app/app.js";

window.addEventListener("DOMContentLoaded", () => {
  startResidentPortal();
});
