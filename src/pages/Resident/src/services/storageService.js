// Thin wrapper around localStorage so the rest of the app can read/write JSON safely.

// Reads a JSON value and falls back cleanly if the key is missing or invalid.
export function readStorage(key, fallbackValue) {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch (error) {
    console.error(`Unable to read localStorage key "${key}".`, error);
    return fallbackValue;
  }
}

// Writes a JSON value to localStorage.
export function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

// Removes a value such as the active session.
export function removeStorage(key) {
  window.localStorage.removeItem(key);
}
