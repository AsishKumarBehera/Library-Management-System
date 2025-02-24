const express = require('express');
const fastcsv = require('fast-csv');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { getIssuedBooks } = require('../models/IssueBook'); // Function to fetch data from DB

const router = express.Router();

// Endpoint to generate report
router.post('/api/reports', async (req, res) => {
  const { startDate, endDate, category, reportType } = req.body;
  
  try {
    // Query the database based on filters (adjust query based on your schema)
    const books = await getIssuedBooks(startDate, endDate, category);
    
    if (reportType === "CSV") {
      // Generate CSV
      const csvStream = fastcsv.format({ headers: true });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
      
      csvStream.pipe(res);
      books.forEach(book => csvStream.write(book));
      csvStream.end();
    } else if (reportType === "PDF") {
      // Generate PDF
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
      
      doc.pipe(res);
      doc.fontSize(12).text("Issued Books Report", { align: 'center' });
      
      books.forEach(book => {
        doc.text(`Title: ${book.title}, Author: ${book.author}, Date: ${book.issueDate}`);
      });
      
      doc.end();
    }
  } catch (error) {
    res.status(500).send("Error generating report");
  }
});

module.exports = router;
