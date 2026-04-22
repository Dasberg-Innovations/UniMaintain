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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter"); // get filter from URL

  // apply filtering based on query param
  const filteredReports = filterReports(reports, filter);

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
                  <ReportCard key={report._id} report={report} filter={filter} filteredReports={filteredReports} />
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