// Date/time formatters used by the dashboard, cards, history, modal, and calendar widget.

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-PH", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});

const LONG_DATE_FORMATTER = new Intl.DateTimeFormat("en-PH", {
  month: "long",
  day: "numeric",
  year: "numeric"
});

const CALENDAR_MONTH_FORMATTER = new Intl.DateTimeFormat("en-PH", {
  month: "long",
  year: "numeric"
});

// Formats a stored ISO date into the small report metadata style seen in cards.
export function formatDateTime(value) {
  return DATE_TIME_FORMATTER.format(new Date(value));
}

// Formats the larger date heading used in the calendar widget.
export function formatLongDate(value) {
  return LONG_DATE_FORMATTER.format(new Date(value));
}

// Formats just the month label for the calendar card.
export function formatCalendarMonth(value) {
  return CALENDAR_MONTH_FORMATTER.format(new Date(value));
}

// Builds the small line under report titles, for example:
// "Apr 1, 2026, 04:30 PM • Sampaguita Street"
export function formatReportMetaLine(createdAt, location) {
  return `${formatDateTime(createdAt)} • ${location}`;
}
