import React from "react";
import "../css/ReportNav.css";
import { useNavigate } from "react-router-dom";
const ReportNav = ({
  role = "user",
  onBack,
  onSave,
  onPrint,
  onNext,
  onPrev,
  onDelete
}) => {
  const navigate = useNavigate();
  const isAdmin = role === "admin";
  const isMaintenance = role === "maintenance";

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
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

        {(isAdmin || isMaintenance) && (
          <button onClick={onSave}>Save</button>
        )}

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