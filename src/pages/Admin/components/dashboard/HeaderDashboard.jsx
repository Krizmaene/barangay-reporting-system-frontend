import StatCard from "./StatCard";
import NotificationDropdown from "../notifications/NotificationDropdown";

function HeaderDashboard({ stats, notifications, unreadNotificationCount, onOpenNotification, onDismissNotification }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__top">
        <div>
          <p className="dashboard-header__eyebrow">Admin Dashboard</p>
          <h1>Update Report Status</h1>
          <p className="dashboard-header__subtitle">
            This UI is for Admin to update the submitted reports of the residents. The Admin can also use the
            filter option to easily access all the pending, ongoing, or resolved reports.
          </p>
        </div>

        <div className="dashboard-header__actions">
          <NotificationDropdown
            notifications={notifications}
            unreadNotificationCount={unreadNotificationCount}
            onOpenNotification={onOpenNotification}
            onDismissNotification={onDismissNotification}
          />
        </div>
      </div>

      <div className="dashboard-header__stats">
        <StatCard label="Total Reports" value={stats.total} tone="slate" />
        <StatCard label="Pending Reports" value={stats.pending} tone="yellow" />
        <StatCard label="Ongoing Reports" value={stats.ongoing} tone="blue" />
        <StatCard label="Resolved Reports" value={stats.resolved} tone="green" />
      </div>
    </header>
  );
}

export default HeaderDashboard;
