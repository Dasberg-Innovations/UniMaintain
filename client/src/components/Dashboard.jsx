import React from "react";
import Sidebar from "./Sidebar";
import "../css/Dashboard.css";

const Dashboard = ({ role, username }) => {

  const renderReports = () => {
    switch (role) {
      case "maintenance":
        return (
          <div className="report">
            <div className="report-item">
              <p className="report-label">Pending Reports</p>
              <span className="report-count">0</span>
            </div>
            <div className="report-item">
              <p className="report-label">Outstanding Reports</p>
              <span className="report-count">0</span>
            </div>
            <div className="report-item">
              <p className="report-label">Resolved Reports</p>
              <span className="report-count">0</span>
            </div>
            <div className="report-item">
              <p className="report-label">Action Log</p>
              <span className="report-count">0</span>
            </div>
          </div>
        );
      case "user":
        return (
          <div className="report">
            <div className="report-item">
              <p className="report-label">Active Reports</p>
              <span className="report-count">0</span>
            </div>
            <div className="report-item">
              <p className="report-label">Logged Reports</p>
              <span className="report-count">0</span>
            </div>
            <div className="report-item">
              <p className="report-label">Resolved Reports</p>
              <span className="report-count">0</span>
            </div>
            <div className="report-item">
              <p className="report-label">Report Log</p>
              <span className="report-count">0</span>
            </div>
          </div>
        );
      case "admin":
        return (
          <div className="report">
            <div className="report-item">
              <p className="report-label">Logged Reports</p>
              <span className="report-count">0</span>
            </div>
            <div className="report-item">
              <p className="report-label">Resolved Reports</p>
              <span className="report-count">0</span>
            </div>
            <div className="report-item">
              <p className="report-label">Report Log</p>
              <span className="report-count">0</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar role={role} activePage="dashboard" />
      <main className="dashboard-main">
        <div className="dashboard-heading">
          <h1>Hello {username},</h1>
          <h2>Welcome to your Dashboard</h2>
          <p className="dashboard-name">{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</p>
        </div>

        {renderReports()}
      </main>
    </div>
  );
};

export default Dashboard;