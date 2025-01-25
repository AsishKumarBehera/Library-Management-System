const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
});

module.exports = mongoose.model("Transaction", transactionSchema);
