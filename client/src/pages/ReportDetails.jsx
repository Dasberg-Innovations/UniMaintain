import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../css/reportDetails.css";
import axios from "axios";

const ReportDetails = () => {
    const { id } = useParams(); 
    const location = useLocation(); 
    const [report, setReport] = useState(location.state?.report || null);
    const [loading, setLoading] = useState(!report);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!report) {
            const fetchReport = async () => {
                try {
                    const res = await axios.get(`/api/reports/${id}`);
                    setReport(res.data);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load report.");
                } finally {
                    setLoading(false);
                }
            };
            fetchReport();
        } else {
            setLoading(false);
        }
    }, [id, report]);

    if (loading) return <p>Loading report...</p>;
    if (error) return <p>{error}</p>;
    if (!report) return <p>No report found.</p>;

    return (
        <div className="report-details-page">
            <Sidebar />

            <div className="report-details-content">
                {/* Title */}
                <h1 className="report-title">{report.title}</h1>

                {/* Info grid */}
                <div className="report-info-grid">
                    <div className="info-left">Status: {report.status}</div>
                    <div className="info-right">Campus: {report.campus}</div>

                    <div className="info-left">Category: {report.category}</div>
                    <div className="info-right">Building: {report.building}</div>

                    <div className="info-left">Priority: {report.priority}</div>
                    <div className="info-right">
                        Suggested Deadline: {report.suggestedDeadline ? new Date(report.suggestedDeadline).toLocaleDateString() : "N/A"}
                    </div>

                    <div className="info-left">
                        Reported By: {report.createdBy.name} Email: {report.createdBy.email} Phone: {report.phone}
                    </div>
                    <div className="info-right">
                        Assigned To: {report.assignedTo ? report.assignedTo.name : "Unassigned"}
                    </div>

                    <div className="info-left">Reported At: {new Date(report.reportedAt).toLocaleString()}</div>
                    <div className="info-right">
                        {report.resolvedAt && `Resolved At: ${new Date(report.resolvedAt).toLocaleString()}`}
                    </div>
                </div>

                {/* Description */}
                <div className="report-description">
                    <h2>Description</h2>
                    <p>{report.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;