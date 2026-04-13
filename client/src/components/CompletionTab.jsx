import React, { useEffect, useState } from "react";
import CompletedBy from "./CompletedBy";

const CompletionTab = ({ editedReport, setEditedReport, role, users }) => {
    // only admins or maintenance can see this tab
    const isAdminOrMaintenance = role !== "user";

    // Hide completely for normal users
    if (!isAdminOrMaintenance) return null;

    // update specific fields of the edited report
    const handleChange = (field, value) => {
        setEditedReport(prev => ({
            ...prev,
            [field]: value  // update the field with new value
        }));
    };

    return (
        <div className="completion-tab">
            <div className="two-column">

                <div className="left-column">
                    <label>Completion Notes</label>
                    <textarea 
                        value={editedReport.completionNotes || ""}  // fallback to empty
                        onChange={(e) => handleChange("completionNotes", e.target.value)}   // update notes
                    />

                    <label>Root Cause</label>
                    <textarea 
                        value={editedReport.rootCause || ""}
                        onChange={(e) => handleChange("rootCause", e.target.value)} // update root cause
                    />

                    <label>Solution</label>
                    <textarea 
                        value={editedReport.solution || ""}
                        onChange={(e) => handleChange("solution", e.target.value)}   // update solution
                    />
                </div>

                <div className="right-column">
                    <label>Completed By</label>
                    <CompletedBy 
                        users={users} 
                        editedReport={editedReport} 
                        handleChange={handleChange} // update completedBy field
                    />

                    <label>Completion Hours</label>
                    <input 
                        type="number" 
                        value={editedReport.completionHours || ""} 
                        onChange={(e) => handleChange("completionHours", e.target.value)} // update hours
                    />

                    <label>Date Completed</label>
                    <input 
                        type="date" 
                        value={editedReport.dateCompleted?.split("T")[0] || ""}         // format date
                        onChange={(e) => handleChange("dateCompleted", e.target.value)} // update date
                    />
                </div>
            </div>
        </div>
    );
};

export default CompletionTab;