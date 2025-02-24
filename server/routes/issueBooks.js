const express = require("express");
const IssueBook = require("../models/IssueBook");
const Book = require("../models/Book");
const router = express.Router();

// 📌 Issue a Book
router.post("/", async (req, res) => {
  const { bookId, issueDate, returnDate, remarks } = req.body;

  if (!bookId || !issueDate || !returnDate) {
    return res.status(400).json({ message: "Book, Issue Date, and Return Date are required." });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // ✅ Check if the book has available copies
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "No available copies of this book." });
    }

    // ✅ Issue book and update availability
    const newIssue = new IssueBook({ book: bookId, issueDate, returnDate, remarks });
    await newIssue.save();

    book.availableCopies -= 1; // Reduce available copies
    await book.save();

    res.status(201).json({ message: "Book issued successfully", issue: newIssue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get all issued books
router.get("/", async (req, res) => {
  try {
    const issuedBooks = await IssueBook.find().populate("book", "title author");
    res.json(issuedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get issued book by ID
router.get("/:id", async (req, res) => {
  try {
    const issuedBook = await IssueBook.findById(req.params.id).populate("book", "title author");
    if (!issuedBook) {
      return res.status(404).json({ message: "Issued book not found" });
    }
    res.json(issuedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Return a Book (Delete issue record)
router.delete("/:id", async (req, res) => {
  try {
    const issuedBook = await IssueBook.findById(req.params.id);
    if (!issuedBook) {
      return res.status(404).json({ message: "Issued book not found" });
    }

    // ✅ Restore book availability
    const book = await Book.findById(issuedBook.book);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    await IssueBook.findByIdAndDelete(req.params.id);
    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
