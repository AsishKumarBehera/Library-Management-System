import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReport, setNewReport] = useState({ title: '', status: '' });
  const [selectedReport, setSelectedReport] = useState(null); // For storing the selected report data
  const navigate = useNavigate(); // For navigation

  // Fetch reports data
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  // Submit the new report to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/reports', newReport);
      setReports((prevReports) => [response.data, ...prevReports]);
      setNewReport({ title: '', status: '' });
    } catch (error) {
      console.error('Error adding report', error);
    }
  };

  // View Report - Fetch details of a specific report
  const viewReport = async (id) => {
    try {
      const response = await axios.get(`/api/reports/${id}`);
      setSelectedReport(response.data); // Store the selected report data
      navigate(`/reports/view/${id}`); // Navigate to a new page to display the report
    } catch (error) {
      console.error("Error viewing report", error);
    }
  };

  if (loading) {
    return <div>Loading reports...</div>;
  }

  if (reports.length === 0) {
    return (
      <div>
        <h1>No reports available</h1>
        <h3>Feel free to add one below:</h3>
        <div className='repoo'>
          <form onSubmit={handleSubmit} className='reports-container' >
            <input
              type="text"
              name="title"
              value={newReport.title}
              onChange={handleInputChange}
              placeholder="Report Title"
              required
            />
            <input
              type="text"
              name="status"
              value={newReport.status}
              onChange={handleInputChange}
              placeholder="Report Status"
              required
            />
            <button type="submit">Add Report</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <h1>Reports</h1>
      <h3>Add a new report below:</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newReport.title}
          onChange={handleInputChange}
          placeholder="Report Title"
          required
        />
        <input
          type="text"
          name="status"
          value={newReport.status}
          onChange={handleInputChange}
          placeholder="Report Status"
          required
        />
        <button type="submit">Add Report</button>
      </form>

      <table className="report-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report._id}</td>
              <td>{report.title}</td>
              <td>{report.status}</td>
              <td>{new Date(report.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => viewReport(report._id)}>View</button>
                <button onClick={() => deleteReport(report._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReport && (
        <div className="report-detail">
          <h2>Report Details</h2>
          <p><strong>Title:</strong> {selectedReport.title}</p>
          <p><strong>Status:</strong> {selectedReport.status}</p>
          <p><strong>Created At:</strong> {new Date(selectedReport.createdAt).toLocaleString()}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

// Function to delete a report
const deleteReport = async (id) => {
  try {
    await axios.delete(`/api/reports/${id}`);
    alert('Report deleted successfully');
    // Refresh the reports list
    window.location.reload(); // Reload to get the latest data after deletion
  } catch (error) {
    console.error('Error deleting report', error);
    alert('Failed to delete report');
  }
};

export default Reports;
