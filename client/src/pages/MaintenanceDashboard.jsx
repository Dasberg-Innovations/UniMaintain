import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebarcomponent";
import "../css-files-pages/MaintainenceDashboard.css";

const MaintenanceDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (  
       <div className="dashboard">
      <Sidebar handleLogout={handleLogout} role="maintenance" activePage="dashboard" />

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