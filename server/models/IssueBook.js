const mongoose = require("mongoose");

const IssueBookSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book", // Reference to the Book model
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  remarks: {
    type: String,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("IssueBook", IssueBookSchema);
