import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartColumn, faFileLines, faList, faHighlighter, 
  faDoorOpen, faFileCirclePlus, faGears 
} from '@fortawesome/free-solid-svg-icons';
import img from "../assets/UniMaintainLogo.png";
import "../components/sidebarcomponent.css"; 

const Sidebar = ({ handleLogout, role, activePage }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-heading1">
        <img src={img} alt="UniMaintain" className="uni-maintain-logo" />
      </div>

      <nav className="sidebar-nav">
        <div className={`sidebar-menu ${activePage === 'dashboard' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faChartColumn} className="nav-icon" />
          <span>Dashboard</span>
        </div>

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
            <div className={`sidebar-menu ${activePage === 'create' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faFileCirclePlus} className="nav-icon" />
              <span>Create Report</span>
            </div>
            <div className={`sidebar-menu ${activePage === 'settings' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faGears} className="nav-icon" />
              <span>Settings</span>
            </div>
          </>
        )}

        <div className={`sidebar-menu ${activePage === 'log' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faFileLines} className="nav-icon" />
          <span>{role === "maintenance" ? "Action Log" : "Report Log"}</span>
        </div>

        <div className="sidebar-menu" onClick={handleLogout}>
          <FontAwesomeIcon icon={faDoorOpen} className="nav-icon" />
          <span>Logout</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;