import React from "react";

// Displays basic information about the user who submitted the report
const ReportedBy = ( {report} ) => {
    // extract reporter details from report
    const { createdBy, phone } = report;
    
     return (
    <div className="reported-by">
      <p style={{ margin: "6px 0" }}>
        <strong>Reported By:</strong> {createdBy?.name}
      </p>

      <p style={{ margin: "10px 0 6px 0" }}>
        <strong>Email:</strong> {createdBy?.email}
      </p>

      <p style={{ margin: "10px 0 0 0" }}>
        <strong>Phone:</strong> {phone || "N/A"}
      </p>
    </div>
  );
};
 
export default ReportedBy;