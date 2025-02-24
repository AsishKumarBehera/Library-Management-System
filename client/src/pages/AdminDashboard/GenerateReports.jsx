import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./GenerateReports.css";

const GenerateReports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [reportType, setReportType] = useState("CSV");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateReport = async () => {
    if (!startDate || !endDate || !category) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:2000/api/reports", {
        startDate,
        endDate,
        category,
        reportType
      });

      const blob = new Blob([response.data], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report.${reportType.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      setLoading(false);
    } catch (error) {
      setMessage("Error generating report. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <h2>Generate Reports</h2>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
        />
      </div>
      <div>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
      </div>
      <div>
        <label>Choose Report Type: </label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="CSV">CSV</option>
          <option value="PDF">PDF</option>
        </select>
      </div>
      <button onClick={handleGenerateReport} disabled={loading}>
        {loading ? "Generating..." : "Generate Report"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default GenerateReports;
