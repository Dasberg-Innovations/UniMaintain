import React from "react";

const ReportedBy = ( {report} ) => {
    const { createdBy, phone } = report;
    
    return ( 
        <div className="reported-by">
            <strong>Reported By:</strong> {createdBy.name}
            <strong>Email:</strong> {createdBy.email}
            <strong>Phone:</strong> {phone || "N/A"}
        </div>
    );
}
 
export default ReportedBy;