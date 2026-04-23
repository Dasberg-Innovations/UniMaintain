import React from "react";
import CompletedBy from "./CompletedBy";
import '../css/GeneralTab&Completion.css';

const CompletionTab = ({ editedReport, setEditedReport, role, users }) => {
    // only admins or maintenance can see this tab
    const isAdminOrMaintenance = role !== "user";

    // Hide completely for normal users
    if (!isAdminOrMaintenance) return null;

    // update specific fields of the edited report
    const handleChange = (field, value) => {
        setEditedReport(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="completion-tab">
            <div className="two-column">

                {/* LEFT COLUMN */}
                <div className="left-column">

                    <div className="input-box">
                        <label>Completion Notes</label>
                        <textarea 
                            value={editedReport.completionNotes || ""}
                            onChange={(e) => handleChange("completionNotes", e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <label>Root Cause</label>
                        <textarea 
                            value={editedReport.rootCause || ""}
                            onChange={(e) => handleChange("rootCause", e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <label>Solution</label>
                        <textarea 
                            value={editedReport.solution || ""}
                            onChange={(e) => handleChange("solution", e.target.value)}
                        />
                    </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="right-column">

                    <div className="input-box">
                        <label>Completed By</label>
                        <CompletedBy 
                            users={users} 
                            editedReport={editedReport} 
                            handleChange={handleChange}
                        />
                    </div>

                    <div className="input-box">
                        <label>Completion Hours</label>
                        <input 
                            type="number" 
                            value={editedReport.completionHours || ""} 
                            onChange={(e) => handleChange("completionHours", e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <label>Date Completed</label>
                        <input 
                            type="date" 
                            value={editedReport.dateCompleted?.split("T")[0] || ""}         
                            onChange={(e) => handleChange("dateCompleted", e.target.value)}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CompletionTab;