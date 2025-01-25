
const mongoose = require('mongoose')
const MaintenanceSchema = new mongoose.Schema({
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  });
  
  module.exports = mongoose.model("Maintenance", MaintenanceSchema);