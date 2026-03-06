import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import React from "react";
import img from "../assets/UniMaintainLogo.png";
import "../css-files-pages/MaintainenceDashboard.css";
import {    FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartColumn, 
  faFileCirclePlus, 
  faFileLines, 
  faList,
  faHighlighter,
  faGears, 
  faDoorOpen 
} from '@fortawesome/free-solid-svg-icons';


const MaintenanceDashboard = () => {

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
                <FontAwesomeIcon icon={faList} className="nav-icon" />
                <span>Outstanding Reports</span>
            </div>
            <div className="sidebar-menu">
                <FontAwesomeIcon icon={faFileLines} className="nav-icon" />
                <span>Report Action Log</span>
            </div>
            <div className="sidebar-menu">
                <FontAwesomeIcon icon={faHighlighter} className="nav-icon" />
                <span>Report Signoff</span>
            </div>

            <div className="sidebar-menu" onClick={handleLogout}>
                <FontAwesomeIcon icon={faDoorOpen} className="nav-icon" />
                <span>Logout</span>
            </div>
            </nav>
      </aside>

      <main className="Maintainence-dashboard">
        <div className="dashboard-heading">
          <h1>Hello User,</h1>
          <h2>Welcome to your Dashboard</h2>
          <p className="dashboard-name">Maintainence Dashboard</p>
        </div>

        <div className="report">
          <div className="report-item">

            <p className="report-label">Pending Reports</p>
            <span className="active-data-report">0</span>
          </div>

          <div className="report-item">
            <p className="report-label">Outstanding Reports</p>
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
}
 
export default MaintenanceDashboard;