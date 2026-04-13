import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Sidebar from "./Sidebar";
import "../css/Dashboard.css";

const Dashboard = ({ role, username }) => {
  // API endpoint for fetching reports
  const REPORT_URL = "/api/reports";
  // access current auth state
  const { auth } = useAuth();
  // store fetched reports
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();   // for navigation
  const location = useLocation();   // to detect state from previous navigation

  // fetch all reports from backend
  const getReports = async () => {
    if (!auth?.accessToken) return;
    
    try {
      const response = await axios.get(REPORT_URL, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      });
      setReports(Array.isArray(response.data) ? response.data : []);  // ensure array
    } catch (err) {
      console.error("Error fetching reports:", err);
      setReports([]);
    }
  };

  // Initial load and when auth changes
  useEffect(() => {
    getReports();
  }, [auth]);

  // Refresh when returning from report creation/editing
  useEffect(() => {
    // Check if we came back from creating/editing a report
    if (location.state?.refresh) {
      getReports();
      // Clear the state to prevent repeated refreshes
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location]);

  // USER / ADMIN LOGIC
  const activeReports = reports.filter(r =>
    ["Submitted", "Assigned", "In Progress"].includes(r.status)
  );

  const resolvedReports = reports.filter(r =>
    r.status === "Resolved"
  );

  const closedReports = reports.filter(r =>
    r.status === "Closed"
  );

  // MAINTENANCE LOGIC
  const pendingReports = reports.filter(r =>
    r.status === "Submitted"
  );

  const outstandingReports = reports.filter(r =>
    ["Assigned", "In Progress"].includes(r.status)
  );

  const reportLog = reports.length; // total reports

  // render dashboard report cards based on role
  const renderReports = () => {
    switch (role) {
      case "maintenance":
        return (
          <div className="report">
            <div className="report-item" onClick={() => navigate("/reportlist?filter=pending")}>
              <p className="report-label">Pending Reports</p>
              <span className="report-count">{pendingReports.length}</span>
            </div>
            <div className="report-item" onClick={() => navigate("/reportlist?filter=outstanding")}>
              <p className="report-label">Outstanding Reports</p>
              <span className="report-count">{outstandingReports.length}</span>
            </div>
            <div className="report-item" onClick={() => navigate("/reportlist?filter=resolved")}>
              <p className="report-label">Resolved Reports</p>
              <span className="report-count">{resolvedReports.length}</span>
            </div>
            <div className="report-item" onClick={() => navigate("/reportlist")}>
              <p className="report-label">Report Log</p>
              <span className="report-count">{reportLog}</span>
            </div>
          </div>
        );
      case "user":
        return (
          <div className="report">
            <div className="report-item" onClick={() => navigate("/reportlist?filter=active")}>
              <p className="report-label">Active Reports</p>
              <span className="report-count">{activeReports.length}</span>
            </div>
            <div className="report-item" onClick={() => navigate("/reportlist?filter=resolved")}>
              <p className="report-label">Resolved Reports</p>
              <span className="report-count">{resolvedReports.length}</span>
            </div>
            <div className="report-item" onClick={() => navigate("/reportlist?filter=closed")}>
              <p className="report-label">Closed Reports</p>
              <span className="report-count">{closedReports.length}</span>
            </div>
            <div className="report-item" onClick={() => navigate("/reportlist")}>
              <p className="report-label">Report Log</p>
              <span className="report-count">{reportLog}</span>
            </div>
          </div>
        );
      case "admin":
        return (
          <div className="report">
            <div className="report-item" onClick={() => navigate("/reportlist?filter=active")}>
              <p className="report-label">Active Reports</p>
              <span className="report-count">{activeReports.length}</span>
            </div>
            <div className="report-item" onClick={() => navigate("/reportlist?filter=resolved")}>
              <p className="report-label">Resolved Reports</p>
              <span className="report-count">{resolvedReports.length}</span>
            </div>
            <div className="report-item" onClick={() => navigate("/reportlist")}>
              <p className="report-label">Report Log</p>
              <span className="report-count">{reportLog}</span>
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
        <div className="dashboard-container">
          <div className="dashboard-heading">
            <h1>Hello {username},</h1>
            <h2>Welcome to your Dashboard</h2>
            <p className="dashboard-name">
              {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
            </p>
          </div>
          <div className="report-section">
            {renderReports()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;