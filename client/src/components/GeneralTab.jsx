import React, { useEffect, useState } from "react";
import ReportedBy from "./ReportedBy";
import AssignedTo from "./AssignedTo";


const GeneralTab = ({ editedReport, setEditedReport, role, users }) => {
    const isAdminOrMaintenance = role === "admin" || role === "maintenance";

    const handleChange = (field, value) => {
        setEditedReport(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="general-tab">
            {/* Reported By - always shows for admins/maintenance, optional for users */}
            {isAdminOrMaintenance && <ReportedBy report={editedReport} />}

            {/* Description - always visible */}
            <div className="details-section">
                <label>Details</label>
                <textarea 
                    value={editedReport.description || ""}
                    readOnly={!isAdminOrMaintenance}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                />
            </div>

            {/* Work Instructions / Assignment / Estimated Hours - admins/maintenance only */}
            {isAdminOrMaintenance && (
                <div className="two-column">

                    <div className="left-column">
                        <label>Work Instructions</label>
                        <textarea 
                            value={editedReport.workInstructions || ""}
                            onChange={(e) =>
                                handleChange("workInstructions", e.target.value)
                            }
                        />
                    </div>

                    <div className="right-column">
                        <label>Assignment</label>
                        <AssignedTo users={users} editedReport={editedReport} handleChange={handleChange} />

                        <label>Estimated Hours</label>
                        <input 
                            type="number" 
                            value={editedReport.estimatedHours || ""} 
                            onChange={(e) =>
                                handleChange("estimatedHours", e.target.value)
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeneralTab;