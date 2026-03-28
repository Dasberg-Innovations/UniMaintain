import React from "react";

const ReportSummary = ({ report, role = "user" }) => {
    const showSuggestedDeadline = role !== "user";

    return (
        <div className="report-summary">
            <h2>Report #{report.id}</h2>

            <div className="summary-row">
                <span>Status: {report.status}</span>
                <span>Priority: {report.priority}</span>
                <span>Maintenance: {report.category}</span>
            </div>

            <div className="summary-row">
                <span>Campus: {report.campus}</span>
                <span>Location: {report.building}</span>
            </div>

            {showSuggestedDeadline && (
                <div className="summary-row">
                    <span>
                        Suggested Deadline:{" "}
                        {report.suggestedDeadline
                        ? new Date(report.suggestedDeadline).toLocaleDateString()
                        : "N/A"}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ReportSummary;