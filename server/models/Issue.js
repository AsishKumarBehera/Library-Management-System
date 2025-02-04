const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date, required: true },
});

module.exports = mongoose.model("Issue", IssueSchema);
