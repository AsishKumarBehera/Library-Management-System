const mongoose = require("mongoose");

const bookModelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,  // Store image URL or path
  },
  availableCopies: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("BookModel", bookModelSchema);
