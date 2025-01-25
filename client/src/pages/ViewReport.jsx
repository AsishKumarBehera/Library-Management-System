// ViewReport.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewReport = () => {
  const { id } = useParams();  // Get the report ID from the URL
  const [report, setReport] = useState(null);

  // Fetch the report data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`/api/reports/${id}`);
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [id]);

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{report.title}</h1>
      <p><strong>Status:</strong> {report.status}</p>
      <p><strong>Created At:</strong> {new Date(report.createdAt).toLocaleString()}</p>
      {/* You can add more fields if needed */}
    </div>
  );
};

export default ViewReport;
