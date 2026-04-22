import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import ReportCard from "../components/ReportCard";
import Sidebar from "../components/Sidebar";
import "../css/ReportList.css";
import "../css/Dashboard.css";

export default function ReportList() {
  const { auth } = useAuth();
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");

  const userId = auth?.user?.id;
  const token = auth?.accessToken;

  // Update seenBy locally
  const handleSeenUpdate = (id) => {
    const userId = auth?.user?.id;
    setReports((prev) =>
      prev.map((r) => {
        if (r._id !== id) return r;
        // Only add if not already seen
        if ((r.seenBy || []).some((s) => s.toString() === userId?.toString())) return r;
        return { ...r, seenBy: [...(r.seenBy || []), userId] };
      })
    );
  };
  
  // Fetch reports from backend
  useEffect(() => {
    const getReports = async () => {
      try {
        if (!token) return;
        const response = await axios.get("/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(response.data || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    getReports();
  }, [token]);

  // Apply filter based on query params
  let filteredReports = reports;

  if (filter === "active") {
    filteredReports = filteredReports.filter((r) =>
      ["Submitted", "Assigned", "In Progress"].includes(r.status)
    );
  } else if (filter === "resolved") {
    filteredReports = filteredReports.filter((r) => r.status === "Resolved");
  } else if (filter === "closed") {
    filteredReports = filteredReports.filter((r) => r.status === "Closed");
  } else if (filter === "pending") {
    filteredReports = filteredReports.filter((r) => r.status === "Submitted");
  } else if (filter === "outstanding") {
    filteredReports = filteredReports.filter((r) =>
      ["Assigned", "In Progress"].includes(r.status)
    );
  }

  // Apply search filter
  if (searchTerm.trim()) {
    const lowerSearch = searchTerm.toLowerCase();
    filteredReports = filteredReports.filter(
      (r) =>
        r.title?.toLowerCase().includes(lowerSearch) ||
        r.category?.toLowerCase().includes(lowerSearch) ||
        r.status?.toLowerCase().includes(lowerSearch)
    );
  }

  return (
    <div className="report-list-container">
      <Sidebar role={auth?.role} activePage="reportlist" />

      <div className="report-list">
        <h2>Reports</h2>

        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search reports by title, category, or status"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  <ReportCard
                    key={report._id}
                    report={report}
                    onSeen={handleSeenUpdate}
                  />
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