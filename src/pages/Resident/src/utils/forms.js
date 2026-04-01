// Form helpers used to collect values and show inline validation feedback.
// These helpers are shared by the sign-in, sign-up, and submit-report screens.

// Converts a submitted form into a plain object for the validation/service layers.
export function getFormValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}

// Clears old inline field errors before a new validation run.
export function clearFormFeedback(form) {
  form.querySelectorAll(".input-error").forEach((element) => {
    element.classList.remove("input-error");
  });

  form.querySelectorAll("[data-error-for]").forEach((element) => {
    element.textContent = "";
  });

  const messageNode = form.querySelector("[data-form-message]");
  if (messageNode) {
    messageNode.textContent = "";
  }
}

// Writes validation messages into the matching field-error areas in the form.
export function applyFormErrors(form, errors = {}) {
  clearFormFeedback(form);

  Object.entries(errors).forEach(([fieldName, message]) => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.add("input-error");
    }

    const errorNode = form.querySelector(`[data-error-for="${fieldName}"]`);
    if (errorNode) {
      errorNode.textContent = message;
    }
  });
}

// Shows a non-field-specific form error, such as invalid credentials.
export function setFormMessage(form, message) {
  const messageNode = form.querySelector("[data-form-message]");
  if (messageNode) {
    messageNode.textContent = message;
  }
}
