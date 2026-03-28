import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../css/reportDetails.css";
import axios from "axios";
import ReportSummary from "../components/ReportSummary";
import ReportedBy from "../components/ReportedBy";
import GeneralTab from "../components/GeneralTab";
import CompletionTab from "../components/CompletionTab";

const ReportDetailsStaff = () => {
    const { id } = useParams(); 
    const location = useLocation(); 

    // TEMP role (replace with real auth later)
    const role = "admin";

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
        <div className="report-details-user-page">
            <Sidebar />

            <div className="report-details-content">
                <ReportSummary report={report} role={role} />
                <ReportedBy report={report} />
                <GeneralTab report={report} role={role} />
                <CompletionTab report={report} role={role} />
            </div>
        </div>
    );
};

export default ReportDetailsStaff;