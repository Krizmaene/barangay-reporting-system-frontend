// Resident settings service.
// Each user has their own saved notification/report-display preferences.

import { DEFAULT_SETTINGS, STORAGE_KEYS } from "../utils/constants.js";
import { readStorage, writeStorage } from "./storageService.js";

function readAllSettings() {
  return readStorage(STORAGE_KEYS.settings, {});
}

function saveAllSettings(settings) {
  writeStorage(STORAGE_KEYS.settings, settings);
}

export function getResidentSettings(residentId) {
  const allSettings = readAllSettings();
  return {
    ...DEFAULT_SETTINGS,
    ...(allSettings[residentId] || {})
  };
}

export function updateResidentSetting(residentId, settingKey, value) {
  const allSettings = readAllSettings();
  const currentSettings = getResidentSettings(residentId);

  allSettings[residentId] = {
    ...currentSettings,
    [settingKey]: Boolean(value)
  };

  saveAllSettings(allSettings);
  return allSettings[residentId];
}
