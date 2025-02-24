// routes/admin.js
const express = require("express");
const Book = require("../models/Book");
const User = require("../models/user");
const Transaction = require("../models/transaction");

const router = express.Router();

// Example for books count in Express
router.get("/api/books/count", async (req, res) => {
  try {
    const bookCount = await Book.countDocuments();
    res.json({ count: bookCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book count" });
  }
});

// Example for users count in Express
router.get("/api/users/count", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ count: userCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user count" });
  }
});

// Example for transactions count in Express
router.get("/api/transactions/count", async (req, res) => {
  try {
    const transactionCount = await Transaction.countDocuments();
    res.json({ count: transactionCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction count" });
  }
});

module.exports = router;
