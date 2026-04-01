// Validation rules for the resident submit-report screen.
// These rules mirror the required fields in the project brief.

import { PUROK_OPTIONS, REPORT_CATEGORIES } from "../utils/constants.js";
import { normalizeText } from "../utils/helpers.js";

export function validateReportForm(values) {
  const errors = {};
  const location = normalizeText(values.incidentLocation);
  const personInvolved = normalizeText(values.personInvolved);
  const description = normalizeText(values.description);

  if (!values.category) {
    errors.category = "Select a report category.";
  } else if (!REPORT_CATEGORIES.includes(values.category)) {
    errors.category = "Choose a valid category.";
  }

  if (!values.purok) {
    errors.purok = "Select the affected purok.";
  } else if (!PUROK_OPTIONS.includes(values.purok)) {
    errors.purok = "Choose a valid purok.";
  }

  if (!location) {
    errors.incidentLocation = "Incident location is required.";
  } else if (location.length < 6) {
    errors.incidentLocation = "Add a more specific location.";
  }

  if (!values.incidentAt) {
    errors.incidentAt = "Incident date and time are required.";
  } else {
    const incidentDate = new Date(values.incidentAt);
    if (Number.isNaN(incidentDate.getTime())) {
      errors.incidentAt = "Use a valid date and time.";
    } else if (incidentDate > new Date()) {
      errors.incidentAt = "Incident date cannot be in the future.";
    }
  }

  if (!personInvolved) {
    errors.personInvolved = "Enter the name of the person involved or write N/A.";
  } else if (personInvolved.length < 3) {
    errors.personInvolved = "Add a clearer name or identify the person as N/A.";
  }

  if (!description) {
    errors.description = "Describe the concern clearly.";
  } else if (description.length < 20) {
    errors.description = "Add more detail so the barangay can review it properly.";
  }

  return errors;
}
