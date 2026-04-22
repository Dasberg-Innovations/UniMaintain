import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import ReportCard from "../components/ReportCard";
import Sidebar from "../components/Sidebar";
import "../css/ReportList.css";
import "../css/Dashboard.css";
import "../css/OutstandingReports.css";
import "../css/sidebar.css";

const REPORT_URL = "/api/reports";

export default function ReportList() {
  const { auth } = useAuth();
  const [reports, setReports] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");
  
  const userId = auth?.userId;

  let filteredReports = reports.filter(r =>
    userId && r.assignedTo?.includes(userId)
  );

  if (filter === "active") {
    filteredReports = filteredReports.filter(r =>
      ["Submitted", "Assigned", "In Progress"].includes(r.status)
    );
  } else if (filter === "resolved") {
    filteredReports = filteredReports.filter(r =>
      r.status === "Resolved"
    );
  } else if (filter === "closed") {
    filteredReports = filteredReports.filter(r =>
      r.status === "Closed"
    );
  } else if (filter === "pending") {
    filteredReports = filteredReports.filter(r =>
      r.status === "Submitted"
    );
  } else if (filter === "outstanding") {
    filteredReports = filteredReports.filter(r =>
      ["Assigned", "In Progress"].includes(r.status)
    );
  }

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    try {
      const response = await axios.get(REPORT_URL, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      });
      setReports(response.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  return (
    <div className="report-list-container">
      <Sidebar role={auth?.role} activePage="reportlist" />
      <div className="report-list">
        <h2>Outstanding Reports</h2>
        <div className="search-container">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Search reports by title, category, or status" 
              className="search-bar"
            />
          </div>
        </div>
        <div className="report-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))
              ) : (
                <tr>
                  <td colSpan="6">No reports found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}