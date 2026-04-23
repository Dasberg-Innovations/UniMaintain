import React from "react";
import {
  STATUS_LIST,
  CATEGORY_LIST,
  PRIORITY_LIST,
  CAMPUS_DATA
} from "../constants/reportOptions";
import "../css/ReportSummary.css";

// Displays and allows editing of key report details (status, priority, location, etc.)
const ReportSummary = ({ editedReport, setEditedReport, role = "user" }) => {
  
  // determine if user has edit permissions
  const isAdminOrMaintenance = role === "admin" || role === "maintenance";

  // update a specific field in the report
  const handleChange = (field, value) => {
    setEditedReport(prev => ({
      ...prev,
      [field]: value  // update field value
    }));
  };

  // get available locations based on selected campus
  const locations = CAMPUS_DATA[editedReport.campus] || [];

  return (
    <div className="report-summary">
      <h2>Report: {editedReport.title}</h2>

      {/* Row 1: status, priority, category  */}
      <div className="summary-row">

        <div>
          <label>Status</label>
          {isAdminOrMaintenance ? (
            <select
              value={editedReport.status || ""}
              onChange={(e) =>
                handleChange("status", e.target.value)  // update status
              }
            >
              <option value="">Select Status</option>
              {STATUS_LIST.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          ) : (
            <span>{editedReport.status}</span>
          )}
        </div>

        <div>
          <label>Priority</label>
          {isAdminOrMaintenance ? (
            <select
              value={editedReport.priority || ""}
              onChange={(e) =>
                handleChange("priority", e.target.value)  // update priority
              }
            >
              <option value="">Select Priority</option>
              {PRIORITY_LIST.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          ) : (
            <span>{editedReport.priority}</span>
          )}
        </div>

        <div>
          <label>Maintenance</label>
          {isAdminOrMaintenance ? (
            <select
              value={editedReport.category || ""}
              onChange={(e) =>
                handleChange("category", e.target.value)  // update category
              }
            >
              <option value="">Select Category</option>
              {CATEGORY_LIST.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          ) : (
            <span>{editedReport.category}</span>
          )}
        </div>
      </div>

      {/* Row 2: campus and location */}
      <div className="summary-row">

        <div>
          <label>Campus</label>
          {isAdminOrMaintenance ? (
            <select
              value={editedReport.campus || ""}
              onChange={(e) => {
                handleChange("campus", e.target.value); // update campus
                handleChange("building", "");           // reset building when campus changes
              }}
            >
              <option value="">Select Campus</option>
              {Object.keys(CAMPUS_DATA).map(campus => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
          ) : (
            <span>{editedReport.campus}</span>
          )}
        </div>

        <div>
          <label>Location</label>
          {isAdminOrMaintenance ? (
            <select
              value={editedReport.building || ""}
              onChange={(e) =>
                handleChange("building", e.target.value)  // update location
              }
              disabled={!editedReport.campus}   // disabled until campus is selected
            >
              <option value="">Select Location</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          ) : (
            <span>{editedReport.building}</span>
          )}
        </div>
      </div>

      {/* Suggested deadline - visible to non-user roles */}
      {role !== "user" && (
        <div className="summary-row">
          <div>
            <label>Suggested Deadline</label>
            {isAdminOrMaintenance ? (
              <input
                type="date"
                value={
                  editedReport.suggestedDeadline
                    ? editedReport.suggestedDeadline.split("T")[0]  // format date for input
                    : ""
                }
                onChange={(e) =>
                  handleChange("suggestedDeadline", e.target.value) // update deadline
                }
              />
            ) : (
              <span>
                {editedReport.suggestedDeadline
                  ? new Date(editedReport.suggestedDeadline).toLocaleDateString() // format display
                  : "N/A"}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSummary;