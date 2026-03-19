import ReportCard from "../components/ReportCard";
import "./ReportList.css";

export default function ReportList() {

  const reports = [
    {
      id: 1,
      title: "Broken AC",
      category: "Electrical",
      location: "St21",
      priority: "High",
      status: "In Progress",
      date: "2026-03-01"
    }
  ];

  return (
    <div className="report-table">

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </tbody>

      </table>

    </div>
  );
}