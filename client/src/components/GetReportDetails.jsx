import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetReportDetails from "../components/GetReportDetails";
import Sidebar from "../components/Sidebar"; // adjust path if needed
import axios from "axios";

const ReportDetailsPage = () => {
    const { id } = useParams(); // grabs report ID from URL
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await axios.get(`/api/reports/${id}`); // your backend endpoint
                setReport(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load report.");
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading) return <p>Loading report...</p>;
    if (error) return <p>{error}</p>;
    if (!report) return <p>Report not found.</p>;

    return (
        <div className="report-details-page-wrapper">
            <Sidebar />
            <div className="report-details-page-content">
                <GetReportDetails report={report} />
            </div>
        </div>
    );
};

export default ReportDetailsPage;