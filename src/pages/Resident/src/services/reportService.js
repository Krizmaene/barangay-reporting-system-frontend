// Resident report service.
// This handles saved reports, dashboard counts, report lookups, and new report creation.

import { STORAGE_KEYS } from "../utils/constants.js";
import { getNextReportId, normalizeText, sortByNewest, uid } from "../utils/helpers.js";
import { readStorage, writeStorage } from "./storageService.js";

function readAllReports() {
  return readStorage(STORAGE_KEYS.reports, []);
}

function saveAllReports(reports) {
  writeStorage(STORAGE_KEYS.reports, reports);
}

// Gets every report that belongs to the signed-in resident.
export function getReportsForResident(residentId) {
  return sortByNewest(
    readAllReports().filter((report) => report.residentId === residentId),
    "createdAt"
  );
}

// Finds a single report while also enforcing resident ownership.
export function getReportById(reportId, residentId) {
  return getReportsForResident(residentId).find((report) => report.id === reportId) || null;
}

// Builds the 4 dashboard analytics cards.
export function getResidentReportMetrics(residentId) {
  const reports = getReportsForResident(residentId);

  return {
    total: reports.length,
    pending: reports.filter((report) => report.status === "Pending").length,
    inProgress: reports.filter((report) => report.status === "In Progress").length,
    resolved: reports.filter((report) => report.status === "Resolved").length
  };
}

// Returns the limited dashboard preview list shown in "My Reports".
export function getRecentReportsPreview(residentId, limit = 6) {
  return getReportsForResident(residentId).slice(0, limit);
}

// Returns the report list used by the full My Reports page.
export function getFilteredResidentReports(residentId, statusFilter = "all") {
  const reports = getReportsForResident(residentId);

  if (statusFilter === "all") {
    return reports;
  }

  return reports.filter((report) => report.status.toLowerCase() === statusFilter.toLowerCase());
}

// Builds the history page list by attaching the most recent resident-visible update to each report.
export function getResidentHistory(residentId) {
  return getReportsForResident(residentId).map((report) => ({
    ...report,
    latestUpdate: getLatestResidentUpdate(report)
  }));
}

// Creates a brand-new resident report from the submit-report form.
export function createResidentReport(residentId, values) {
  const reports = readAllReports();
  const createdAt = new Date().toISOString();
  const reportId = getNextReportId(reports, createdAt);

  const newReport = {
    id: reportId,
    residentId,
    title: values.category,
    category: values.category,
    purok: values.purok,
    incidentLocation: normalizeText(values.incidentLocation),
    personInvolved: normalizeText(values.personInvolved),
    description: normalizeText(values.description),
    preferredUpdateMethod: values.preferredUpdateMethod || "In App",
    photoName: values.photo && values.photo.name ? values.photo.name : "",
    status: "Pending",
    createdAt,
    incidentAt: new Date(values.incidentAt).toISOString(),
    updatedAt: createdAt,
    timeline: [
      {
        id: uid("evt"),
        type: "report-received",
        title: "Report received",
        message: "Report submitted successfully. Awaiting barangay review.",
        createdAt,
        status: "Pending"
      }
    ],
    adminComments: []
  };

  reports.push(newReport);
  saveAllReports(reports);
  return newReport;
}

// Picks the most recent update for the History screen summary text.
export function getLatestResidentUpdate(report) {
  const latestTimeline = [...report.timeline].sort((left, right) => {
    return new Date(right.createdAt) - new Date(left.createdAt);
  })[0];

  const latestComment = [...report.adminComments].sort((left, right) => {
    return new Date(right.createdAt) - new Date(left.createdAt);
  })[0];

  if (!latestComment) {
    return latestTimeline;
  }

  if (!latestTimeline || new Date(latestComment.createdAt) > new Date(latestTimeline.createdAt)) {
    return {
      title: "Admin comment added",
      message: latestComment.text,
      createdAt: latestComment.createdAt,
      status: report.status
    };
  }

  return latestTimeline;
}
