import React from "react";

const ReportedBy = ({ report }) => {
  const createdBy = report?.createdBy;
  const phone = report?.phone;

  return ( 
    <div className="reported-by">
      <strong>Reported By:</strong> {createdBy?.name || "Unknown"} <br />
      <strong>Email:</strong> {createdBy?.email || "N/A"} <br />
      <strong>Phone:</strong> {phone || "N/A"}
    </div>
  );
};

export default ReportedBy;