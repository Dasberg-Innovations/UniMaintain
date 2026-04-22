export const filterReports = (reports, filter) => {
  if (!filter) return reports;

  if (filter === "active") {
    return reports.filter(r =>
      ["Submitted", "Assigned", "In Progress"].includes(r.status)
    );
  }

  if (filter === "resolved") {
    return reports.filter(r => r.status === "Resolved");
  }

  if (filter === "closed") {
    return reports.filter(r => r.status === "Closed");
  }

  if (filter === "pending") {
    return reports.filter(r => r.status === "Submitted");
  }

  if (filter === "outstanding") {
    return reports.filter(r =>
      ["Assigned", "In Progress"].includes(r.status)
    );
  }

  return reports;
};