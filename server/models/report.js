const mongoose = require('mongoose');

// Define the Report Schema
const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set the default value as the current date and time
    },
  },
  { timestamps: true } // This will automatically add `createdAt` and `updatedAt` fields
);

// Create a Report model based on the schema
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
