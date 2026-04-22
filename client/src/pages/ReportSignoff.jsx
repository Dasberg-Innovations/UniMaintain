import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import "../css/ReportSignoff.css";
import "../css/Dashboard.css";

const REPORT_URL = "/api/reports";

const ReportSignoff = () => {
  const { auth } = useAuth();

  const [reports, setReports] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await axios.get(REPORT_URL, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        const activeReports = response.data.filter((r) =>
          ["Submitted", "Assigned", "In Progress"].includes(r.status)
        );

        setReports(activeReports);
      } catch (err) {
        setErrMsg("Failed to load reports");
      }
    };

    getReports();
  }, [auth?.accessToken]);

  const handleSelect = (id) => {
    setSelectedId(id);

    const report = reports.find((r) => String(r._id) === String(id));

    setSelectedReport(report || null);
    setSuccessMsg("");
    setErrMsg("");
  };

  const handleSignoff = async () => {
    if (!selectedReport) return;

    try {
      await axios.patch(
        `${REPORT_URL}/${selectedReport._id}`,
        { status: "Closed" },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      setSuccessMsg("Report successfully signed off.");

      setReports((prev) =>
        prev.filter((r) => r._id !== selectedReport._id)
      );

      setSelectedReport(null);
      setSelectedId("");
    } catch (err) {
      setErrMsg("Failed to sign off report");
    }
  };

  return (
    <div className="report-container">
      <Sidebar role={auth?.role} activePage="signoff" />

      <div className="report-content">
        <div className="report-form-box">
          <h1>Report Sign Off</h1>

          {errMsg && <p className="errmsg">{errMsg}</p>}
          {successMsg && <p className="successmsg">{successMsg}</p>}

          <label>Select Active Report:</label>
          <select
            value={selectedId}
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="">-- Select Report --</option>
            {reports.map((r) => (
              <option key={r._id} value={r._id}>
                {r.title} ({r.status})
              </option>
            ))}
          </select>

          {selectedReport && (
            <div className="report-details">
              <h3>Report Details</h3>

              <p><strong>Title:</strong> {selectedReport.title}</p>
              <p><strong>Description:</strong> {selectedReport.description}</p>
              <p><strong>Phone:</strong> {selectedReport.phone}</p>
              <p><strong>Campus:</strong> {selectedReport.campus}</p>
              <p><strong>Building:</strong> {selectedReport.building}</p>
              <p><strong>Category:</strong> {selectedReport.category}</p>
              <p><strong>Priority:</strong> {selectedReport.priority}</p>
              <p><strong>Status:</strong> {selectedReport.status}</p>
              <p>
                <strong>Date Completed:</strong>{" "}
                {selectedReport.dateCompleted
                    ? selectedReport.dateCompleted.split("T")[0]
                    : "Not completed"}
                </p>
              <button onClick={handleSignoff}>
                Sign Off Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportSignoff;