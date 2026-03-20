import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReportCard({ report }) {

  const navigate = useNavigate();

  const handleClick = () => {
        navigate(`/reports/${report._id}`, { state: { report } });
    };

  return (
    <tr onClick={handleClick} style={{ cursor: "pointer" }} className="report-card-row">
      <td>{report.title}</td>
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