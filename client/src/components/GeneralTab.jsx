import React, { useEffect, useState } from "react";
import ReportedBy from "./ReportedBy";
import AssignedTo from "./AssignedTo";
import "../css/GeneralTab&Completion.css"

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
<<<<<<< HEAD
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
=======

            {/* Reported By - always shows for admins/maintenance*/}
            {isAdminOrMaintenance && (
                <div className="card-box">
                    <ReportedBy report={editedReport} />
                </div>
            )}

            {/* Description - always visible, readonly for normal users  */}
            <div className="card-box">
                <label>Details</label>
                <textarea
                    value={editedReport.description || ""}  // fallback to empty string
                    readOnly={!isAdminOrMaintenance}        // only editable for admins/maintenance
                    onChange={(e) =>
                        handleChange("description", e.target.value) // update description
>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
                    }
                />
            </div>

            {/* Work Instructions / Assignment / Estimated Hours - admins/maintenance only */}
            {isAdminOrMaintenance && (
<<<<<<< HEAD
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
=======
                <div className="card-box two-column">

                    <div className="left-column box-inner">

                        <label>Work Instructions</label>
                        <textarea
                            value={editedReport.workInstructions || ""}
                            onChange={(e) =>
                                handleChange("workInstructions", e.target.value)    // update instructions
                            }
                        />

                    </div>

                    <div className="right-column box-inner">

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

>>>>>>> b69b25abe6b24471a37c01784ae73806e7ff1ee2
                </div>
            )}
        </div>
    );
};

export default GeneralTab;