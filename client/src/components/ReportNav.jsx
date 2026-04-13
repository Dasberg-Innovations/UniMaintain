import React from "react";
import "../css/ReportNav.css";
import { useNavigate } from "react-router-dom";

// Navigation bar for report actions (back, save, print, etc.)
const ReportNav = ({
  role = "user",
  onBack,
  onSave,
  onPrint,
  onNext,
  onPrev,
  onDelete
}) => {

  const navigate = useNavigate(); // for navigation fallback

  // role-based permissions
  const isAdmin = role === "admin";
  const isMaintenance = role === "maintenance";

  // handle back navigation (custom or fallback)
  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1); // go to previous page
    }
  };

  return (
    <div className="report-nav">

      {/* LEFT SIDE */}
      <div className="nav-left">
        <button onClick={handleGoBack}>← Back</button>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <button onClick={onPrint}>Print</button>
        <button onClick={onPrev}>←</button>
        <button onClick={onNext}>→</button>

        {/* Save option for admin and maintenance */}
        {(isAdmin || isMaintenance) && (
          <button onClick={onSave}>Save</button>
        )}

        {/* Admin-only actions dropdown */}
        {isAdmin && (
          <div className="actions-dropdown">
            <button>Actions ▼</button>
            <div className="dropdown-menu">
              <button onClick={onDelete}>Delete Report</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ReportNav;