import React, { useState, useEffect } from 'react';
import './styles/Profile.css';
import ResidentLayout from './components/layout/ResidentLayout';
import API from '../../api/axios';
import { normalizeReportPayload } from '../../utils/reportUtils';
import { normalizeResidentUser } from '../../utils/userUtils';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      setUser(normalizeResidentUser(JSON.parse(saved)));
    }

    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get('/reports/my');
      setReports(normalizeReportPayload(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'R';

  const resolved = reports.filter(r => r.status === 'Resolved').length;

  const fields = [
    { label: 'Full Name', value: user?.fullName || 'Not provided' },
    { label: 'Email', value: user?.email || 'Not provided' },
    { label: 'Mobile Number', value: user?.mobile || 'Not provided' },
    { label: 'Address', value: user?.purok ? `${user.purok}, Mataas na Lupa` : 'Not provided' },
    { label: 'Account Type', value: 'Resident' },
    { label: 'Member Since', value: user?.memberSince || 'Not available' },
  ];

  const handleLogout = () => {
    window.dispatchEvent(new CustomEvent('resident-request-logout'));
  };

  return (
    <ResidentLayout activePage="profile">
      {/* Hero */}
      <div className="profile__hero">
        <div className="profile__hero-left">
          <div className="profile__hero-avatar">{initials}</div>
          <div>
            <div className="profile__hero-label">USER PROFILE</div>
            <div className="profile__hero-name">{user?.fullName || 'Resident Account'}</div>
            <div className="profile__hero-sub">Resident account preview linked from the top profile card.</div>
          </div>
        </div>
        <button className="profile__hero-logout" onClick={handleLogout}>Log Out</button>
      </div>

      <div className="profile__grid">
        {/* Personal Info */}
        <div className="profile__info-card">
          <div className="profile__info-title">Personal Information</div>
          <div className="profile__info-sub">Resident details displayed in the same card style.</div>
          <div className="profile__fields-grid">
            {fields.map(f => (
              <div key={f.label} className="profile__field">
                <div className="profile__field-label">{f.label}</div>
                <div className="profile__field-value">{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="profile__summary-card">
          <div className="profile__summary-title">Resident Summary</div>
          <div className="profile__summary-sub">Visual account snapshot for the user profile screen.</div>
          {[
            { label: 'Total Reports', value: reports.length },
            { label: 'Resolved Reports', value: resolved },
            { label: 'Unread Notifications', value: 5 },
          ].map(s => (
            <div key={s.label} className="profile__summary-item">
              <div className="profile__summary-label">{s.label}</div>
              <div className="profile__summary-value">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </ResidentLayout>
  );
}
