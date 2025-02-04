const express = require("express");
const Issue = require("../models/Issue");
const Book = require("../models/Book");
const router = express.Router();

// Issue a book
router.post("/", async (req, res) => {
  const { bookId, userId, returnDate } = req.body;

  if (!bookId || !userId || !returnDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.isIssued) {
      return res.status(400).json({ message: "Book is already issued" });
    }

    const newIssue = new Issue({ book: bookId, user: userId, returnDate });
    await newIssue.save();

    book.isIssued = true;
    await book.save();

    res.status(201).json(newIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all issued books
router.get("/", async (req, res) => {
  try {
    const issuedBooks = await Issue.find().populate("book user");
    res.json(issuedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Return a book
router.post("/return", async (req, res) => {
  const { issueId } = req.body;

  try {
    const issue = await Issue.findById(issueId);
    if (!issue) return res.status(404).json({ message: "Issue record not found" });

    await Issue.findByIdAndDelete(issueId);

    const book = await Book.findById(issue.book);
    if (book) {
      book.isIssued = false;
      await book.save();
    }

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
