import React, { useEffect, useState } from "react";
import CompletedBy from "./CompletedBy";

const CompletionTab = ({ editedReport, setEditedReport, role, users }) => {
    const isAdminOrMaintenance = role !== "user";

    // Hide completely for normal users
    if (!isAdminOrMaintenance) return null;

    const handleChange = (field, value) => {
        setEditedReport(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="completion-tab">
            <div className="two-column">

                <div className="left-column">
                    <label>Completion Notes</label>
                    <textarea 
                        value={editedReport.completionNotes || ""}
                        onChange={(e) => handleChange("completionNotes", e.target.value)}
                    />

                    <label>Root Cause</label>
                    <textarea 
                        value={editedReport.rootCause || ""}
                        onChange={(e) => handleChange("rootCause", e.target.value)}
                    />

                    <label>Solution</label>
                    <textarea 
                        value={editedReport.solution || ""}
                        onChange={(e) => handleChange("solution", e.target.value)}
                    />
                </div>

                <div className="right-column">
                    <label>Completed By</label>
                    <CompletedBy users={users} editedReport={editedReport} handleChange={handleChange}/>

                    <label>Completion Hours</label>
                    <input 
                        type="number" 
                        value={editedReport.completionHours || ""} 
                        onChange={(e) => handleChange("completionHours", e.target.value)}
                    />

                    <label>Date Completed</label>
                    <input 
                        type="date" 
                        value={editedReport.dateCompleted?.split("T")[0] || ""} 
                        onChange={(e) => handleChange("dateCompleted", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CompletionTab;