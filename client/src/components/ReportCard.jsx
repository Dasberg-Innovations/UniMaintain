export default function ReportCard({ report }) {
  return (
    <tr>
      <td>{report.title}</td>
      <td>{report.category}</td>
      <td>{report.location}</td>
      <td>{report.priority}</td>
      <td className={`status ${report.status.toLowerCase().replace(" ", "-")}`}>
        {report.status}
      </td>
      <td>{report.date}</td>
    </tr>
  );
}