import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import "../css/reportDetails.css";
import axios from "../api/axios";
import ReportSummary from "../components/ReportSummary";
import ReportNav from "../components/ReportNav";
import GeneralTab from "../components/GeneralTab";


const ReportDetailsUser = () => {
    const { id } = useParams(); 
    const location = useLocation(); 
    const [report, setReport] = useState(location.state?.report || null);
    const [loading, setLoading] = useState(!report);
    const [error, setError] = useState(null);

    const { auth } = useAuth();

    useEffect(() => {

        if (!report) {
            const getReport = async () => {
                try {
                    const res = await axios.get(`/api/reportuser/${id}`);
                    setReport(res.data);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load report.");
                } finally {
                    setLoading(false);
                }
            };
            getReport();
        } else {
            setLoading(false);
        }
    }, [id, report]);

    if (loading) return <p>Loading report...</p>;
    if (error) return <p>{error}</p>;
    if (!report) return <p>No report found.</p>;

    return (
        <div className="report-details-user-page">
            <Sidebar role={auth?.role} activePage="reportuser" />

            <div className="report-details-content">
                <ReportNav role={auth?.role}/>
                {/*  Summary  */}
                <ReportSummary report={report} role={auth?.role} />
                
                <GeneralTab report={report} role={auth?.role}/>
            </div>
        </div>
    );
};

export default ReportDetailsUser;