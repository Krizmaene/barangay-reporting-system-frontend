const STATUS_LABELS = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  ongoing: 'In Progress',
  "in progress": 'In Progress',
  "in-progress": 'In Progress',
};

function normalizeComment(comment) {
  if (!comment) {
    return null;
  }

  return {
    ...comment,
    author: comment.author || comment.user?.name || comment.user?.fullName || "Admin",
    text: comment.text || comment.comment || comment.message || "",
    date: comment.date || comment.createdAt || comment.updatedAt || "",
  };
}

export function normalizeReportStatus(status) {
  if (!status && status !== 0) {
    return 'Pending';
  }

  const raw = String(status).trim().toLowerCase();
  return STATUS_LABELS[raw] || STATUS_LABELS[raw.replace(/\s+/g, '_')] || STATUS_LABELS[raw.replace(/-/g, '_')] || status;
}

export function normalizeReportPayload(payload) {
  const reports = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.reports)
      ? payload.reports
      : [];

  return reports.map((report) => ({
    ...report,
    id: report.id || report._id,
    status: normalizeReportStatus(report.status),
    comments: (Array.isArray(report.comments) ? report.comments : Array.isArray(report.adminFeedback) ? report.adminFeedback : [])
      .map(normalizeComment)
      .filter(Boolean),
    adminFeedback: (Array.isArray(report.adminFeedback) ? report.adminFeedback : Array.isArray(report.comments) ? report.comments : [])
      .map(normalizeComment)
      .filter(Boolean),
  }));
}
