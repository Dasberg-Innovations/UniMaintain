import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function ReportCard({ report, onSeen }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth?.user?.id;
  const token = auth?.accessToken;

  // Local state to immediately hide new badge
  const [hasSeen, setHasSeen] = useState(
    (report.seenBy || []).some(id => id.toString() === userId?.toString())
  );

  const handleClick = async () => {
    // If not already seen, mark as seen
    if (!hasSeen) {
      try {
        const response = await axios.put(
          `http://localhost:3500/reports/${report._id}/seen`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Mark as seen response:", response.data);
        setHasSeen(true);

        // Notify parent component
        if (onSeen) onSeen(report._id);
      } catch (err) {
        console.error("Error marking as seen:", err);
      }
    }

    // Navigate based on role
    if (auth?.role === "admin" || auth?.role === "maintenance") {
      navigate(`/reportstaff/${report._id}`, { state: { report } });
    } else {
      navigate(`/reportuser/${report._id}`, { state: { report } });
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
        {report.status}
      </td>
      <td>{new Date(report.reportedAt).toLocaleDateString()}</td>
    </tr>
  );
}