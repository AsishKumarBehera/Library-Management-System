const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// POST a new transaction
router.post("/", async (req, res) => {
  const { date, description, amount, status } = req.body;

  try {
    const newTransaction = new Transaction({ date, description, amount, status });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: "Failed to create transaction" });
  }
});

// DELETE a transaction by ID
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});


router.post("/", async (req, res) => {
  const { date, description, amount, status } = req.body;

  try {
    const newTransaction = new Transaction({
      date: date || new Date(), // Default to current date if not provided
      description,
      amount,
      status: status || "Pending", // Default to "Pending" if not provided
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: "Failed to create transaction", details: err.message });
  }
});

module.exports = router;
