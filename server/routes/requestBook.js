const express = require("express");
const router = express.Router();
const BookModel = require("../models/BookModel");  // Use the new BookModel
const User = require("../models/UserModel");

// Route to request a book
router.post("/request-book", async (req, res) => {
  try {
    const { userId, bookId } = req.body; // Assuming you're passing userId and bookId in the request body

    // Check if the book exists
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the book is available
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "Sorry, no copies available" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the book to the user's requestedBooks list
    user.requestedBooks.push(book);
    await user.save();

    // Decrease the available copies of the book
    book.availableCopies -= 1;
    await book.save();

    return res.status(200).json({ message: "Book requested successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
