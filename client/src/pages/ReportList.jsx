import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import ReportCard from "../components/ReportCard";
import Sidebar from "../components/Sidebar";
import "../css/ReportList.css";
import "../css/Dashboard.css";

const REPORT_URL = "/api/reports"

export default function ReportList() {

const { auth } = useAuth();

  const [reports, setReports] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");

  let filteredReports = reports;

  if (filter === "active") {
    filteredReports = reports.filter(r =>
      ["Submitted", "Assigned", "In Progress"].includes(r.status)
    );
  } else if (filter === "resolved") {
    filteredReports = reports.filter(r =>
      r.status === "Resolved"
    );
  } else if (filter === "closed") {
    filteredReports = reports.filter(r =>
      r.status === "Closed"
    );
  } else if (filter === "pending") {
    filteredReports = reports.filter(r =>
      r.status === "Submitted"
    );
  } else if (filter === "outstanding") {
    filteredReports = reports.filter(r =>
      r.status === ["Assigned", "In Progress"].includes(r.status)
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

      <Sidebar role={auth?.role} activePage="reportlist"/>

      <div className="report-list">
        <h2>Reports</h2>

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