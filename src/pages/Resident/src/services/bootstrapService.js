// Prepares the resident demo environment the first time the frontend runs.
// This keeps the project usable even before a backend or real database exists.

import { DEMO_RESIDENT, SEEDED_REPORTS } from "../data/seedData.js";
import { DEFAULT_SETTINGS, SEED_VERSION, STORAGE_KEYS } from "../utils/constants.js";
import { deepClone } from "../utils/helpers.js";
import { readStorage, writeStorage } from "./storageService.js";

export function bootstrapResidentPortal() {
  const savedUsers = readStorage(STORAGE_KEYS.users, null);
  const savedReports = readStorage(STORAGE_KEYS.reports, null);
  const savedSettings = readStorage(STORAGE_KEYS.settings, null);

  // Only seed missing collections.
  // Existing resident data should never be overwritten just because the frontend code changed.
  if (!savedUsers) {
    writeStorage(STORAGE_KEYS.users, [deepClone(DEMO_RESIDENT)]);
  }

  if (!savedReports) {
    writeStorage(STORAGE_KEYS.reports, deepClone(SEEDED_REPORTS));
  }

  if (!savedSettings) {
    writeStorage(STORAGE_KEYS.settings, {
      [DEMO_RESIDENT.id]: deepClone(DEFAULT_SETTINGS)
    });
  }

  writeStorage(STORAGE_KEYS.seedVersion, SEED_VERSION);
}
