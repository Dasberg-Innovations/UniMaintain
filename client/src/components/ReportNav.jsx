import React from "react";

const ReportNav = ({
  role = "user",
  onBack,
  onPrint,
  onNext,
  onPrev,
  onSave,
  onDelete
}) => {

  const isAdmin = role === "admin";
  const isMaintenance = role === "maintenance";

  return (
    <div className="report-nav">

      {/* LEFT SIDE */}
      <div className="nav-left">
        <button onClick={onBack}>← Back</button>
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