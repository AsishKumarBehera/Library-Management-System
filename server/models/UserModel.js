const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  requestedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookModel", // Reference to the BookModel
    },
  ],
  // Additional fields can be added here as needed
});

module.exports = mongoose.model("UserModel", userSchema);
