// Future-ready HTTP client hook for backend integration.
// The current frontend runs locally from localStorage, but this helper
// reserves the exact axios version requested by the user for later API work.

import { AXIOS_VERSION } from "../utils/constants.js";

export function getAxiosClient() {
  if (!window.axios) {
    return null;
  }

  if (window.axios.VERSION !== AXIOS_VERSION) {
    throw new Error(`Expected axios ${AXIOS_VERSION}, but found ${window.axios.VERSION}.`);
  }

  return window.axios.create({
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    timeout: 10000
  });
}
