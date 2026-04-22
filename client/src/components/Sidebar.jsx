import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartColumn, faFileLines, faList, faHighlighter, 
  faDoorOpen, faFileCirclePlus, faGears, 
  faBell
} from '@fortawesome/free-solid-svg-icons';
import img from "../assets/UniMaintainLogo.png";
import LogoutButton from './LogoutButton';
import "../css/sidebar.css";

const Sidebar = ({ role, activePage }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-heading1">
        <img src={img} alt="UniMaintain" className="uni-maintain-logo" />
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className={`sidebar-menu ${activePage === 'dashboard' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faChartColumn} className="nav-icon" />
          <span>Dashboard</span>
        </Link>

        <Link to="/reportform" className={`sidebar-menu ${activePage === 'create' ? 'active' : ''}`} >
          <FontAwesomeIcon icon={faFileCirclePlus} className="nav-icon" />
          <span>Create Report</span>
        </Link>

        {role === "maintenance" && (
          <>
            <div className={`sidebar-menu ${activePage === 'outstanding' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faList} className="nav-icon" />
              <span>Outstanding Reports</span>
            </div>
            <div className={`sidebar-menu ${activePage === 'signoff' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faHighlighter} className="nav-icon" />
              <span>Report Signoff</span>
            </div>
          </>
        )}

        {role === "user" && (
          <>
            
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/users" className={`sidebar-menu ${activePage === 'users' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faHighlighter} className="nav-icon" />
              <span>User Management</span>
            </Link>
          </>
        )}

        <Link to="/notifications" className={`sidebar-menu ${activePage === 'settings' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faBell} className="nav-icon" />
          <span>Notifications</span>
        </Link>

        <Link to="/settings" className={`sidebar-menu ${activePage === 'settings' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faGears} className="nav-icon" />
          <span>Settings</span>
        </Link>

        <LogoutButton />
      </nav>
    </aside>
  );
};

export default Sidebar;