// Hash-based router for the resident single-page frontend.
// Example routes:
// #/signin
// #/dashboard
// #/my-reports

import { AUTH_ROUTES, ROUTES } from "../utils/constants.js";

export function getCurrentRoute() {
  const rawHash = window.location.hash.replace(/^#\/?/, "").trim();
  return rawHash || ROUTES.SIGNIN;
}

export function isAuthRoute(routeName) {
  return AUTH_ROUTES.includes(routeName);
}

export function normalizeRoute(routeName, isAuthenticated) {
  const allRoutes = new Set(Object.values(ROUTES));
  const sanitizedRoute = allRoutes.has(routeName) ? routeName : ROUTES.DASHBOARD;

  if (!isAuthenticated && !isAuthRoute(sanitizedRoute)) {
    return ROUTES.SIGNIN;
  }

  if (isAuthenticated && isAuthRoute(sanitizedRoute)) {
    return ROUTES.DASHBOARD;
  }

  return sanitizedRoute;
}

export function navigateTo(routeName) {
  const nextHash = `#/${routeName}`;
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
  }
}
