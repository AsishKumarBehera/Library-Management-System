import React, { useState } from "react";
import "./IssueBook.css"; // CSS file for styling

const IssueBook = ({ books = [
    {id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald"}, 
    {id: 2, title: "You Don’t Know JS (Book Series)", author: "Kyle Simpson"}, 
    {id: 3, title: "Introduction to Algorithms", author: "Thomas H. Cormen"}, 
    {id: 4, title: "To Kill a Mockingbird", author: "Harper Lee"}, 
    {id: 5, title: "The Good Parts", author: "Douglas Crockford"}, 
    {id: 6, title: "Think and Grow Rich", author: "Napoleon Hill"}, 
    {id: 7, title: "Dare to Lead", author: "Brave Work"}, 
    {id: 8, title: "The Matrix", author: "The Wachowskis"}, 
    {id: 9, title: "The Godfather", author: "Francis Ford Coppola"}, 
], onIssue }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [returnDate, setReturnDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().slice(0, 10)
  );
  const [error, setError] = useState("");

  const handleSelectBook = (e) => {
    const bookId = e.target.value;
    const book = books.find((b) => b.id.toString() === bookId);
    setSelectedBook(book || null);
    setError("");
  };

  const handleReturnDateChange = (e) => {
    const selectedReturnDate = e.target.value;
    if (new Date(selectedReturnDate) > new Date(issueDate)) {
      setReturnDate(selectedReturnDate);
      setError("");
    } else {
      setError("Return date must be after the issue date.");
    }
  };

  const handleIssueBook = (e) => {
    e.preventDefault();
    if (!selectedBook) {
      setError("Please select a book.");
      return;
    }
    onIssue(selectedBook, issueDate, returnDate);
  };

  return (
    <div className="issue-book-container">
      <h2>Issue a Book</h2>
      <form className="issue-form" onSubmit={handleIssueBook}>
        <div className="form-group">
          <label>Select Book:</label>
          <select onChange={handleSelectBook} defaultValue="">
            <option value="">-- Choose a Book --</option>
            {books.length > 0 ? (
              books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} - {book.author}
                </option>
              ))
            ) : (
              <option disabled>No books available</option>
            )}
          </select>
        </div>

        {selectedBook && (
          <div className="book-details">
            <p><strong>Title:</strong> {selectedBook.title}</p>
            <p><strong>Author:</strong> {selectedBook.author}</p>
          </div>
        )}

        <div className="form-group">
          <label>Issue Date:</label>
          <input type="date" value={issueDate} readOnly />
        </div>

        <div className="form-group">
          <label>Return Date:</label>
          <input type="date" value={returnDate} onChange={handleReturnDateChange} min={issueDate} />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="issue-button">Issue Book</button>
      </form>
    </div>
  );
};

export default IssueBook;
