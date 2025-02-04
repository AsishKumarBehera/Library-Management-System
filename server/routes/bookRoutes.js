const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new book
router.post("/", async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) return res.status(400).json({ message: "Title and author are required" });

  try {
    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
