// Draft report service.
// This stores and retrieves in-progress report drafts separately from submitted reports.
// Drafts are saved locally so residents can continue filing without losing entered details.
import { STORAGE_KEYS } from "../utils/constants.js";
import { readStorage, writeStorage } from "./storageService.js";

function readAllDrafts() {
  return readStorage(STORAGE_KEYS.reportDrafts, {});
}

function saveAllDrafts(drafts) {
  writeStorage(STORAGE_KEYS.reportDrafts, drafts);
}

export function getReportDraft(residentId) {
  const drafts = readAllDrafts();
  return drafts[residentId] || null;
}

export function saveReportDraft(residentId, draft) {
  const drafts = readAllDrafts();
  const sanitizedDraft = { ...draft };

  if (sanitizedDraft.photo && sanitizedDraft.photo.name) {
    sanitizedDraft.photoName = sanitizedDraft.photo.name;
  }

  delete sanitizedDraft.photo;
  drafts[residentId] = { ...sanitizedDraft, savedAt: new Date().toISOString() };
  saveAllDrafts(drafts);
}

export function clearReportDraft(residentId) {
  const drafts = readAllDrafts();
  if (drafts[residentId]) {
    delete drafts[residentId];
    saveAllDrafts(drafts);
  }
}
