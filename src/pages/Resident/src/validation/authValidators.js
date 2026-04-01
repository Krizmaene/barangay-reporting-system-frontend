// Validation rules for the resident sign-in and sign-up screens.
// These functions return field-level errors so the UI can show exact feedback inline.

import { PUROK_OPTIONS } from "../utils/constants.js";
import { normalizeText } from "../utils/helpers.js";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidMobileNumber(value) {
  return /^(09\d{9}|\+639\d{9})$/.test(value);
}

function isStrongPassword(value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
}

export function validateSignIn(values) {
  const errors = {};
  const email = normalizeText(values.email);

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  }

  return errors;
}

export function validateSignUp(values, isEmailTaken) {
  const errors = {};
  const fullName = normalizeText(values.fullName);
  const email = normalizeText(values.email).toLowerCase();
  const mobileNumber = normalizeText(values.mobileNumber);

  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 5) {
    errors.fullName = "Enter your full name clearly.";
  }

  if (!values.purok) {
    errors.purok = "Select your purok.";
  } else if (!PUROK_OPTIONS.includes(values.purok)) {
    errors.purok = "Choose a valid purok.";
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  } else if (isEmailTaken(email)) {
    errors.email = "That email address is already registered.";
  }

  if (!mobileNumber) {
    errors.mobileNumber = "Mobile number is required.";
  } else if (!isValidMobileNumber(mobileNumber)) {
    errors.mobileNumber = "Use 09XXXXXXXXX or +639XXXXXXXXX.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (!isStrongPassword(values.password)) {
    errors.password = "Use at least 8 characters with uppercase, lowercase, and a number.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}
