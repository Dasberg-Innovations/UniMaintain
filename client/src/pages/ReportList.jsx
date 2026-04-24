import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { filterReports } from "../constants/reportFilters";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import ReportCard from "../components/ReportCard";
import Sidebar from "../components/Sidebar";
import "../css/ReportList.css";
import "../css/Dashboard.css";

const REPORT_URL = "/api/reports"

export default function ReportList() {

  // access user auth info
  const { auth } = useAuth();

  // store fetched reports
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter"); // get filter from URL

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

  // apply filtering based on query param
  let filteredReports = filterReports(reports, filter);

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
  // fetch reports on initial load
  useEffect(() => {
    getReports();
  }, []);

  // retrieve reports from backend
  const getReports = async () => {
    try {
      const response = await axios.get(REPORT_URL, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      });

      setReports(response.data);  // update state with fetched reports
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };
  

  return (
    <div className="report-list-container">

      <Sidebar role={auth?.role} activePage="reportlist"/>

      <div className="report-list">
        <h2>Reports</h2>

        {/* Search bar (UI only for now) */}
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
                    filter={filter} 
                    filteredReports={filteredReports} 
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