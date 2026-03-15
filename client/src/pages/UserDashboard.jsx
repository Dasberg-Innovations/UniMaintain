import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebarcomponent";
import "../css-files-pages/userDashboard.css";

const UserDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard">
      <Sidebar handleLogout={handleLogout} role="user" activePage="dashboard" />

      <main className="user-dashboard">
        <div className="dashboard-heading">
          <h1>Hello User,</h1>
          <h2>Welcome to your Dashboard</h2>
          <p className="dashboard-name">Report Dashboard</p>
        </div>

        <div className="report">
          <div className="report-item">
            <p className="report-label">Active Reports</p>
            <span className="active-data-report">0</span>
          </div>

          <div className="report-item">
            <p className="report-label">Logged Reports</p>
            <span className="logged-reports">0</span>
          </div>

          <div className="report-item">
            <p className="report-label">Resolved Reports</p>
            <span className="resolved-reports">0</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;