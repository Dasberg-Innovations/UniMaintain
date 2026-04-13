import React, { useEffect, useState } from "react";
import ReportedBy from "./ReportedBy";
import AssignedTo from "./AssignedTo";


const GeneralTab = ({ editedReport, setEditedReport, role, users }) => {
    // only admins or maintenance get full editing rights
    const isAdminOrMaintenance = role === "admin" || role === "maintenance";

    // update specific fields of the edited report
    const handleChange = (field, value) => {
        setEditedReport(prev => ({
            ...prev,
            [field]: value // update field with new value
        }));
    };

    return (
        <div className="general-tab">
            {/* Reported By - always shows for admins/maintenance*/}
            {isAdminOrMaintenance && <ReportedBy report={editedReport} />}

            {/* Description - always visible, readonly for normal users  */}
            <div className="details-section">
                <label>Details</label>
                <textarea 
                    value={editedReport.description || ""}  // fallback to empty string
                    readOnly={!isAdminOrMaintenance}        // only editable for admins/maintenance
                    onChange={(e) =>
                        handleChange("description", e.target.value) // update description
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
                                handleChange("workInstructions", e.target.value)    // update instructions
                            }
                        />
                    </div>

                    <div className="right-column">
                        <label>Assignment</label>
                        <AssignedTo 
                            users={users} 
                            editedReport={editedReport} 
                            handleChange={handleChange} // update assigned user
                        />

                        <label>Estimated Hours</label>
                        <input 
                            type="number" 
                            value={editedReport.estimatedHours || ""} 
                            onChange={(e) =>
                                handleChange("estimatedHours", e.target.value)  // update hours
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeneralTab;