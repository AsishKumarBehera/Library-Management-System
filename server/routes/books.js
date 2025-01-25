const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Get all books
router.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    res.json(books); // Send books as a JSON response
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

module.exports = router;
