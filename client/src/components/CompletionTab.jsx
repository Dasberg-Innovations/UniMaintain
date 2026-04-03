import React from "react";

const CompletionTab = ({ report, role }) => {
    const isAdminOrMaintenance = role !== "user";

    // Hide completely for normal users
    if (!isAdminOrMaintenance) return null;

    return (
        <div className="completion-tab">
            <div className="two-column">
                <div className="left-column">
                    <label>Completion Notes</label>
                    <textarea readOnly value={report.completionNotes || ""}></textarea>

                    <label>Root Cause</label>
                    <textarea readOnly value={report.rootCause || ""}></textarea>

                    <label>Solution</label>
                    <textarea readOnly value={report.solution || ""}></textarea>
                </div>

                <div className="right-column">
                    <label>Completed By</label>
                    <textarea readOnly value={report.completedBy?.map(user => user.name).join(", ") || ""}></textarea>

                    <label>Completion Hours</label>
                    <input type="number" readOnly value={report.completionHours || ""} />

                    <label>Date Completed</label>
                    <input type="date" readOnly value={report.dateCompleted?.split("T")[0] || ""} />
                </div>
            </div>
        </div>
    );
};

export default CompletionTab;