import React from "react";

// Displays basic information about the user who submitted the report
const ReportedBy = ( {report} ) => {
    // extract reporter details from report
    const { createdBy, phone } = report;
    
    return ( 
        <div className="reported-by">
            <strong>Reported By:</strong> {createdBy.name}
            <strong>Email:</strong> {createdBy.email}
            <strong>Phone:</strong> {phone || "N/A"} {/* fallback if no phone provided */}
        </div>
    );
}
 
export default ReportedBy;