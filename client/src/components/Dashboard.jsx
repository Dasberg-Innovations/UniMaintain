import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Sidebar from "./Sidebar";
import "../css/Dashboard.css";

const Dashboard = ({ role, username }) => {
  
  const REPORT_URL = "/api/reports";

  const { auth } = useAuth();

  const [reports, setReports] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.accessToken) {
      getReports();
    }
  }, [auth]);

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

  // MAINTENANCE LOGIC (your naming)
  const pendingReports = reports.filter(r =>
    r.status === "Submitted"
  );

  const outstandingReports = reports.filter(r =>
    ["Assigned", "In Progress"].includes(r.status)
  );

  // LOGS
  const reportLog = reports.length;

  const getReports = async () => {
    try {
      const response = await axios.get(REPORT_URL, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      });

      setReports(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
    }
  };

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