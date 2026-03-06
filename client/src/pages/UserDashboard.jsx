import React from "react";
import img from "../assets/UniMaintainLogo.png";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

    return (
        <div>
            <h1>User Dashboard Page</h1>
            <button onClick={handleLogout}>Logout</button>
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