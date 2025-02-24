const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// 📌 Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Add a new book (with category validation)
router.post("/", async (req, res) => {
  const { title, author, category, image } = req.body;

  // ✅ Validate required fields
  if (!title || !author || !category) {
    return res.status(400).json({ message: "Title, author, and category are required" });
  }

  try {
    // ✅ Check if the book already exists
    const existingBook = await Book.findOne({ title, author, category });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists." });
    }

    // ✅ Create a new book entry
    const newBook = new Book({ title, author, category, image });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get a book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Update a book
router.put("/:id", async (req, res) => {
  const { title, author, category, image } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, category, image },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
