import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Single report row in a table
// Clickable to navigate to the report details
export default function ReportCard({ report }) {
  
  // for navigating to report details
  const navigate = useNavigate();
  // access user role
  const { auth } = useAuth();

  // handle row click based on user role
  const handleClick = () => {
    if (auth?.role === "admin" || auth?.role === "maintenance") {
      navigate(`/reportstaff/${report._id}`, { state: { report } });  // admin/maintenance view
    } else {
      navigate(`/reportuser/${report._id}`, { state: { report } });   // regular user view
    }
  };

  return (
    <tr onClick={handleClick} style={{ cursor: "pointer" }} className="report-card-row">
      <td>
        {report.title}
        {!hasSeen && (
          <span
            style={{
              marginLeft: "8px",
              background: "red",
              color: "white",
              padding: "2px 6px",
              borderRadius: "8px",
              fontSize: "10px"
            }}
          >
            NEW
          </span>
        )}
      </td>
      <td>{report.category}</td>
      <td>{report.campus} - {report.building}</td>
      <td>{report.priority}</td>
      <td className={`status ${report.status.toLowerCase().replace(/\s+/g, "-")}`}>
        {report.status} {/* status with class for styling */}
      </td>
      <td>{new Date(report.reportedAt).toLocaleDateString()}</td> {/* format reported date */}
    </tr>
  );
}