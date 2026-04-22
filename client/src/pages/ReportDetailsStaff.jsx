import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
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
<<<<<<< HEAD

const ReportDetailsStaff = () => {
    const { id } = useParams(); 
    const location = useLocation(); 

    const { auth } = useAuth();
=======
import CompletedBy from "../components/CompletedBy";

const REPORT_URL = "/api/reports";

const ReportDetailsStaff = () => {
    const { id } = useParams();     // get report ID from URL
    const location = useLocation(); // access navigation state

    const { auth } = useAuth();

    // restrict access to admin and maintenance roles
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
    if (auth?.role !== "admin" && auth?.role !== "maintenance") {
        return <p>Access denied.</p>;
    }

<<<<<<< HEAD
=======
    // report state (use passed state first, fallback to fetch)
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
    const [report, setReport] = useState(location.state?.report || null);
    const [loading, setLoading] = useState(!report);
    const [error, setError] = useState(null);

<<<<<<< HEAD
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

=======
    // user list for assignment
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    // filter only maintenance users
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
    const maintenanceUsers = users.filter(
        user => user.role === "maintenance"
    );
  
<<<<<<< HEAD
    const [editedReport, setEditedReport] = useState(report);
    
    const [value, setValue] = useState(0);

=======
    // editable version of report
    const [editedReport, setEditedReport] = useState(report);
    
    // tab state
    const [value, setValue] = useState(0);

    // handle tab change
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

<<<<<<< HEAD
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            await axios.put(`/api/reports/${report._id}`, editedReport, {
=======
    const navigate = useNavigate(); // for navigation

    // save updated report to backend
    const handleSave = async () => {
        try {
            await axios.put(`${REPORT_URL}/${report._id}`, editedReport, {
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`,
                },
            });
            alert("Report updated successfully!");
        } catch (err) {
            console.error("Error saving report:", err);
<<<<<<< HEAD
            console.log("Saving to:", `/api/reports/${report._id}`);
            console.log("Edited report:", editedReport);
        }
    };

=======
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

    // navigate back to report list
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
    const handleBack = () => {
        navigate("/reportlist", { replace: true });
    };

<<<<<<< HEAD
=======
    // redirect if not authenticated
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
    if (!auth?.accessToken) {
        return <Navigate to="/login" replace />;
    }

<<<<<<< HEAD
    useEffect(() => {
        if (report) {
            setEditedReport(report);
        }
    }, [report]);
        
=======
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
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
    useEffect(() => {
        if (!report) {
            const getReport = async () => {
                try {
                    const res = await axios.get(`/api/reports/${id}`,{
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
        } else {
            setLoading(false);
        }
    }, [id, auth]);

<<<<<<< HEAD
=======
    // fetch users for assignment dropdowns
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
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

    if (loading) return <p>Loading report...</p>;
    if (error) return <p>{error}</p>;
    if (!report) return <p>No report found.</p>;

    return (
        <div className="report-details-user-page">
            <Sidebar role={auth?.role} activePage="reportstaff"/>

            <div className="report-details-content">
<<<<<<< HEAD
                <ReportNav role={auth?.role} onBack={handleBack} onSave={handleSave}/>
=======
                <ReportNav role={auth?.role} onBack={handleBack} onSave={handleSave} onDelete={handleDelete}/>
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
                <ReportSummary editedReport={editedReport} setEditedReport={setEditedReport} role={auth?.role} />

                <Box>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="General" />
                        <Tab label="Completion" />
                    </Tabs>

                    <Box sx={{ padding: 2 }}>
<<<<<<< HEAD
=======
                        {/* General tab */}
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
                        {value === 0 && 
                            <GeneralTab 
                                editedReport={editedReport} 
                                setEditedReport={setEditedReport}
                                role={auth?.role}  
                                users={maintenanceUsers} 
                            />
                        }
<<<<<<< HEAD
=======
                        {/* Completion tab */}
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
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