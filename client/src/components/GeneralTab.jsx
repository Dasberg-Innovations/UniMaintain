import React from "react";
import ReportedBy from "./ReportedBy";

const GeneralTab = ({ report, role }) => {
    const isUser = role === "user";
    const isAdminOrMaintenance = role !== "user";

    return (
        <div className="general-tab">
            {/* Reported By - always shows for admins/maintenance, optional for users */}
            {isAdminOrMaintenance && <ReportedBy report={report} />}

            {/* Description - always visible */}
            <div className="details-section">
                <label>Details</label>
                <textarea readOnly value={report.description}></textarea>
            </div>

            {/* Work Instructions / Assignment / Estimated Hours - admins/maintenance only */}
            {isAdminOrMaintenance && (
                <div className="two-column">
                    <div className="left-column">
                        <label>Work Instructions</label>
                        <textarea readOnly value={report.workInstructions || ""}></textarea>
                    </div>

                    <div className="right-column">
                        <label>Assignment</label>
                        <textarea readOnly value={report.assignment || ""}></textarea>

                        <label>Estimated Hours</label>
                        <input type="number" readOnly value={report.estimatedHours || ""} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeneralTab;