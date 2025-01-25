// routes/reports.js (backend)
const express = require('express');
const Report = require('../models/report');  // Assuming you have a Report model
const router = express.Router();

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Get a specific report by ID
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the report' });
  }
});

// Add a new report
router.post('/', async (req, res) => {
    try {
      const { title, status } = req.body;
      const newReport = new Report({ title, status });
  
      await newReport.save(); // Save the new report to the database
      res.status(201).json(newReport);  // Send back the newly added report
    } catch (error) {
      res.status(500).json({ error: 'Failed to add report' });
    }
  });

// Delete a report
router.delete('/:id', async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete report' });
  }
});

module.exports = router;
