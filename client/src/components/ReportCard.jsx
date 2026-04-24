import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const REPORT_URL = "/api/reports";

// Single report row in a table
// Clickable to navigate to the report details
export default function ReportCard({ report, filter, filteredReports, onSeen }) {
  
  // for navigating to report details
  const navigate = useNavigate();
  // access user role
  const { auth } = useAuth();

  const userId = auth?.userId;
  const token = auth?.accessToken;

  // Local state to immediately hide new badge
  const [hasSeen, setHasSeen] = useState(
    (report.seenBy || []).some(
      id => id && id.toString() === userId?.toString()
    )
  );

  // handle row click based on user role
  const handleClick = async () => {
    // If not already seen, mark as see
    if (!hasSeen) {
      try {
        const response = await axios.put(`${REPORT_URL}/${report._id}/seen`, 
          {},
          {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setHasSeen(true);

        // notify parent if needed
        if (onSeen) onSeen(report._id);
      } catch (err) {
        console.error("Error marking as seen:", err);
      }
    }

    if (auth?.role === "admin" || auth?.role === "maintenance") {
      // admin/maintenance view
      navigate(`/reportstaff/${report._id}?filter=${filter}`, {
        state: { 
          report,
          reportIds: filteredReports.map(r => r._id)
        } });  
    } else {
      // regular user view
      navigate(`/reportuser/${report._id}?filter=${filter}`, {
        state: { 
          report,
          reportIds: filteredReports.map(r => r._id)
        }});   
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