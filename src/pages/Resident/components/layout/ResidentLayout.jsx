import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResidentNavbar from "./ResidentNavbar";
import ResidentSidebar from "./ResidentSidebar";
import { normalizeResidentUser } from "../../../../utils/userUtils";

const PAGE_TO_ROUTE = {
  dashboard: "/resident",
  submit: "/submit-report",
  reports: "/my-reports",
  history: "/history",
  settings: "/settings",
  profile: "/profile",
  notifications: "/notifications",
};

const resolvePage = (pathname) => {
  if (pathname.startsWith("/submit")) return "submit";
  if (pathname.startsWith("/my-reports")) return "reports";
  if (pathname.startsWith("/history")) return "history";
  if (pathname.startsWith("/settings")) return "settings";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/notifications")) return "notifications";
  return "dashboard";
};

export default function ResidentLayout({ activePage, children, user, unreadCount = 0 }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const currentPage = activePage || resolvePage(location.pathname);

  const resident = useMemo(() => {
    if (user) return normalizeResidentUser(user);
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("user");
      return raw ? normalizeResidentUser(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }, [user]);

  const handleNavigate = (page) => {
    const route = PAGE_TO_ROUTE[page];
    if (route) {
      navigate(route);
    }
  };

  const handleRequestLogout = () => {
    setIsLogoutConfirmOpen(true);
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmOpen(false);
  };

  const handleConfirmLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setIsLogoutConfirmOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const requestLogout = () => {
      setIsLogoutConfirmOpen(true);
    };

    window.addEventListener("resident-request-logout", requestLogout);
    return () => window.removeEventListener("resident-request-logout", requestLogout);
  }, []);

  return (
    <div className="resident-shell">
      {isLogoutConfirmOpen ? (
        <div className="resident-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="resident-logout-title">
          <div className="resident-confirm-modal__backdrop" onClick={handleCancelLogout} />
          <section className="resident-confirm-modal__card">
            <p className="resident-confirm-modal__eyebrow">Log Out</p>
            <h2 id="resident-logout-title">Log out of your resident account?</h2>
            <p className="resident-confirm-modal__copy">
              You will end the current session and return to the login screen.
            </p>
            <div className="resident-confirm-modal__actions">
              <button type="button" className="resident-confirm-modal__button resident-confirm-modal__button--ghost" onClick={handleCancelLogout}>
                Cancel
              </button>
              <button type="button" className="resident-confirm-modal__button resident-confirm-modal__button--danger" onClick={handleConfirmLogout}>
                Log Out
              </button>
            </div>
          </section>
        </div>
      ) : null}

      <ResidentNavbar activePage={currentPage} onNavigate={handleNavigate} unreadCount={unreadCount} user={resident} />
      <div className="resident-shell__content">
        <ResidentSidebar
          activePage={currentPage}
          onNavigate={handleNavigate}
          user={resident}
          onLogout={handleRequestLogout}
        />
        <main className="resident-shell__main">{children}</main>
      </div>
    </div>
  );
}
