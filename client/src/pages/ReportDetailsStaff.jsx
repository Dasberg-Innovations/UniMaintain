import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, useSearchParams , Navigate } from "react-router-dom";
import { filterReports } from "../constants/reportFilters";
import Sidebar from "../components/Sidebar";
import "../css/reportDetails.css";
import axios from "../api/axios";
import ReportSummary from "../components/ReportSummary";
import GeneralTab from "../components/GeneralTab";
import CompletionTab from "../components/CompletionTab";
import useAuth from "../hooks/useAuth";
import ReportNav from "../components/ReportNav";
import "../css/reportDetails.css";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const REPORT_URL = "/api/reports";

const ReportDetailsStaff = () => {
    const { id } = useParams();     // get report ID from URL
    const location = useLocation(); // access navigation state

    const { auth } = useAuth();

    // restrict access to admin and maintenance roles
    if (auth?.role !== "admin" && auth?.role !== "maintenance") {
        return <p>Access denied.</p>;
    }

    // report state (use passed state first, fallback to fetch)
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // user list for assignment
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    // filter only maintenance users
    const maintenanceUsers = users.filter(
        user => user.role === "maintenance"
    );
  
    // editable version of report
    const [editedReport, setEditedReport] = useState(null);
    
    // tab state
    const [value, setValue] = useState(0);

    // handle tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate(); // for navigation

    // save updated report to backend
    const handleSave = async () => {
        try {
            await axios.put(`${REPORT_URL}/${report._id}`, editedReport, {
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`,
                },
            });
            alert("Report updated successfully!");
        } catch (err) {
            console.error("Error saving report:", err);
        }
    };

    // delete report after confirmation
    const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
        try {
            await axios.delete(`${REPORT_URL}/${report._id}`, {
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`,
                },
            });
            alert("Report deleted successfully!");
            navigate("/reportlist", { replace: true });
        } catch (err) {
            console.error("Error deleting report:", err);
        }
    };

    // get filter value from URL query params
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter");

    // navigate back to report list
    const handleBack = () => {
        navigate(`/reportlist?filter=${filter}`, { replace: true });
    };

    // get list of report IDs from navigation state (used for next/prev navigation)
    const reportIds = location.state?.reportIds || [];
    
    // find current report position inside the list
    const currentIndex = reportIds.indexOf(id);

    // navigate to next report in the current filtered list
    const handleNext = () => {
        if (currentIndex < reportIds.length - 1) {
            const nextId = reportIds[currentIndex + 1];
            navigate(`/reportstaff/${nextId}?filter=${filter}`, {
                state: { reportIds } // preserve navigation list
            });
        }
    };

    // navigate to previous report in the current filtered list
    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevId = reportIds[currentIndex - 1];
            navigate(`/reportstaff/${prevId}?filter=${filter}`, {
                state: { reportIds } // preserve navigation list
            });
        }
    };

    // redirect if not authenticated
    if (!auth?.accessToken) {
        return <Navigate to="/login" replace />;
    }

    // sync edited report when report data changes
    useEffect(() => {
        if (report) {
            setEditedReport({
                ...report,
                assignedTo: report.assignedTo?.map(u =>typeof u === "object" ? u._id : u ) || [],
                completedBy: report.completedBy?.map(u =>typeof u === "object" ? u._id : u ) || []
            });
        }
    }, [report]);
        
    // fetch report if not passed via navigation state
    useEffect(() => {
        const getReport = async () => {
            try {
                    if (location.state?.report) {
                        setReport(location.state.report);
                    }
                    const res = await axios.get(`${REPORT_URL}/${id}`,{
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

    // fetch users for assignment dropdowns
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get("/api/users", {
                    headers: {
                        Authorization: `Bearer ${auth?.accessToken}`
                    }
                });

                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoadingUsers(false);
            }
        };

        getUsers();
    }, [auth]);

    if (loading  || !editedReport) return <p>Loading report...</p>;
    if (error) return <p>{error}</p>;
    if (!report) return <p>No report found.</p>;

    return (
        <div className="report-details-user-page">
            <Sidebar role={auth?.role} activePage="reportstaff"/>

            <div className="report-details-content">
                <ReportNav 
                    role={auth?.role} 
                    onBack={handleBack} 
                    onSave={handleSave} 
                    onDelete={handleDelete}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    currentIndex={currentIndex}
                    reportIds={reportIds}
                />
                <ReportSummary editedReport={editedReport} setEditedReport={setEditedReport} role={auth?.role} />

                <Box>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="General" />
                        <Tab label="Completion" />
                    </Tabs>

                    <Box sx={{ padding: 2 }}>
                        {/* General tab */}
                        {value === 0 && 
                            <GeneralTab 
                                editedReport={editedReport} 
                                setEditedReport={setEditedReport}
                                role={auth?.role}  
                                users={maintenanceUsers} 
                            />
                        }
                        {/* Completion tab */}
                        {value === 1 && 
                            <CompletionTab 
                                editedReport={editedReport} 
                                setEditedReport={setEditedReport}
                                role={auth?.role} 
                                users={maintenanceUsers}
                            />
                        }
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default ReportDetailsStaff;