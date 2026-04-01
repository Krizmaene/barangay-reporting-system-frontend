// Resident notification service.
// Notifications are generated from report timeline events and admin comments.

import { sortByNewest } from "../utils/helpers.js";
import { getReportsForResident } from "./reportService.js";

function mapTimelineEntry(report, entry) {
  return {
    id: `${report.id}-${entry.id}`,
    type: entry.type,
    reportId: report.id,
    reportTitle: report.title,
    title: entry.title,
    message: entry.message,
    status: entry.status || report.status,
    category: report.category,
    createdAt: entry.createdAt
  };
}

function mapAdminComment(report, comment) {
  return {
    id: `${report.id}-${comment.id}`,
    type: "admin-comment",
    reportId: report.id,
    reportTitle: report.title,
    title: "Admin comment added",
    message: comment.text,
    status: report.status,
    category: report.category,
    createdAt: comment.createdAt
  };
}

// Builds the resident notification feed shown on the dashboard and notifications page.
export function getNotificationsForResident(residentId, limit = null) {
  const notifications = getReportsForResident(residentId).flatMap((report) => {
    const timelineEntries = report.timeline.map((entry) => mapTimelineEntry(report, entry));
    const commentEntries = report.adminComments.map((comment) => mapAdminComment(report, comment));
    return [...timelineEntries, ...commentEntries];
  });

  const sortedNotifications = sortByNewest(notifications, "createdAt");
  return limit ? sortedNotifications.slice(0, limit) : sortedNotifications;
}

// Bell-badge count shown in the top ribbon.
export function getNotificationBadgeCount(residentId) {
  return Math.min(getNotificationsForResident(residentId).length, 9);
}
