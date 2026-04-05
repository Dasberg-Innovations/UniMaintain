import React from "react";
import {
  STATUS_LIST,
  CATEGORY_LIST,
  PRIORITY_LIST,
  CAMPUS_DATA
} from "../constants/reportOptions";
import "../css/ReportSummary.css";

const ReportSummary = ({ editedReport, setEditedReport, role = "user" }) => {
  const isAdminOrMaintenance = role === "admin" || role === "maintenance";

  const handleChange = (field, value) => {
    setEditedReport(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const locations = CAMPUS_DATA[editedReport.campus] || [];

  return (
    <div className="report-summary">
      <h2>Report #{editedReport.id}</h2>

      {/* Row 1 */}
      <div className="summary-row">

        <div>
          <label>Status</label>
          {isAdminOrMaintenance ? (
            <select
              value={editedReport.status || ""}
              onChange={(e) =>
                handleChange("status", e.target.value)
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
                handleChange("priority", e.target.value)
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
                handleChange("category", e.target.value)
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

      {/* Row 2 */}
      <div className="summary-row">

        <div>
          <label>Campus</label>
          {isAdminOrMaintenance ? (
            <select
              value={editedReport.campus || ""}
              onChange={(e) => {
                handleChange("campus", e.target.value);
                handleChange("building", "");
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
                handleChange("building", e.target.value)
              }
              disabled={!editedReport.campus}
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

      {role !== "user" && (
        <div className="summary-row">
          <div>
            <label>Suggested Deadline</label>
            {isAdminOrMaintenance ? (
              <input
                type="date"
                value={
                  editedReport.suggestedDeadline
                    ? editedReport.suggestedDeadline.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleChange("suggestedDeadline", e.target.value)
                }
              />
            ) : (
              <span>
                {editedReport.suggestedDeadline
                  ? new Date(editedReport.suggestedDeadline).toLocaleDateString()
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