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

const ReportDetailsStaff = () => {
    const { id } = useParams(); 
    const location = useLocation(); 

    const { auth } = useAuth();
    if (auth?.role !== "admin" && auth?.role !== "maintenance") {
        return <p>Access denied.</p>;
    }

    const [report, setReport] = useState(location.state?.report || null);
    const [loading, setLoading] = useState(!report);
    const [error, setError] = useState(null);

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    const maintenanceUsers = users.filter(
        user => user.role === "maintenance"
    );
  
    const [editedReport, setEditedReport] = useState(report);
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            await axios.put(`/api/reports/${report._id}`, editedReport, {
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`,
                },
            });
            alert("Report updated successfully!");
        } catch (err) {
            console.error("Error saving report:", err);
            console.log("Saving to:", `/api/reports/${report._id}`);
            console.log("Edited report:", editedReport);
        }
    };

    const handleBack = () => {
        navigate("/reportlist", { replace: true });
    };

    if (!auth?.accessToken) {
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        if (report) {
            setEditedReport(report);
        }
    }, [report]);
        
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
                <ReportNav role={auth?.role} onBack={handleBack} onSave={handleSave}/>
                <ReportSummary editedReport={editedReport} setEditedReport={setEditedReport} role={auth?.role} />

                <Box>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="General" />
                        <Tab label="Completion" />
                    </Tabs>

                    <Box sx={{ padding: 2 }}>
                        {value === 0 && 
                            <GeneralTab 
                                editedReport={editedReport} 
                                setEditedReport={setEditedReport}
                                role={auth?.role}  
                                users={maintenanceUsers} 
                            />
                        }
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