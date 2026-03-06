import React from "react";
import img from "../assets/UniMaintainLogo.png";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../css-files-pages/userDashboard.css";
import {    FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartColumn, 
  faFileCirclePlus, 
  faFileLines, 
  faGears, 
  faDoorOpen 
} from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-heading1">
          <img src={img} alt="UniMaintain" className="uni-maintain-logo" />
        </div>
        <nav className="sidebar-nav">
            <div className="sidebar-menu active">
                <FontAwesomeIcon icon={faChartColumn} className="nav-icon" />
                <span>Dashboard</span>
            </div>
            <div className="sidebar-menu">
                <FontAwesomeIcon icon={faFileCirclePlus} className="nav-icon" />
                <span>Create Report</span>
            </div>
            <div className="sidebar-menu">
                <FontAwesomeIcon icon={faFileLines} className="nav-icon" />
                <span>Report Log</span>
            </div>
            <div className="sidebar-menu">
                <FontAwesomeIcon icon={faGears} className="nav-icon" />
                <span>Settings</span>
            </div>

            <div className="sidebar-menu" onClick={handleLogout}>
                <FontAwesomeIcon icon={faDoorOpen} className="nav-icon" />
                <span>Logout</span>
            </div>
            </nav>
      </aside>

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