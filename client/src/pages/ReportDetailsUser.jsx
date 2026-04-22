import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate,  useSearchParams, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import "../css/reportDetails.css";
import axios from "../api/axios";
import ReportSummary from "../components/ReportSummary";
import ReportNav from "../components/ReportNav";
import GeneralTab from "../components/GeneralTab";

const REPORT_URL = "/api/reports";

const ReportDetailsUser = () => {

    // get report ID from URL
    const { id } = useParams(); 
    // access navigation state
    const location = useLocation(); 

    // access user role
    const { auth } = useAuth();

    // report state (use passed state first, fallback to fetch)
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // for navigation

    // get filter from URL (for back navigation consistency)
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter");

    // get list of report IDs from navigation state (used for next/prev navigation)
    const reportIds = location.state?.reportIds || [];

    // current index in list
    const currentIndex = reportIds.indexOf(id);

    // navigate next
    const handleNext = () => {
        if (currentIndex < reportIds.length - 1) {
            const nextId = reportIds[currentIndex + 1];
            navigate(`/reportuser/${nextId}?filter=${filter}`, {
                state: { reportIds }
            });
        }
    };

    // navigate previous
    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevId = reportIds[currentIndex - 1];
            navigate(`/reportuser/${prevId}?filter=${filter}`, {
                state: { reportIds }
            });
        }
    };

    // navigate back to list
    const handleBack = () => {
        navigate(`/reportlist?filter=${filter}`, { replace: true });
    };

    // fetch report if not passed via navigation state
    useEffect(() => {
        const getReport = async () => {
            try {
                // use state first if available
                if (location.state?.report) {
                    setReport(location.state.report);
                }
                const res = await axios.get(`${REPORT_URL}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth?.accessToken}`
                    }
                });

                setReport(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load report.");
            } finally {
                setLoading(false);
            }
        };
        getReport();
    }, [id, auth?.accessToken]);

    if (loading) return <p>Loading report...</p>;
    if (error) return <p>{error}</p>;
    if (!report) return <p>No report found.</p>;

    return (
        <div className="report-details-user-page">
            <Sidebar role={auth?.role} activePage="reportuser" />

            <div className="report-details-content">
                <ReportNav 
                    role={auth?.role}
                    onBack={handleBack}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    currentIndex={currentIndex}
                    reportIds={reportIds}
                />
                {/* Report summary (read-only for users) */}
                <ReportSummary editedReport={report} role={auth?.role} />
                
                <GeneralTab editedReport={report} role={auth?.role}/>
            </div>
        </div>
    );
};

export default ReportDetailsUser;