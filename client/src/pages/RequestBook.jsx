import { useState } from "react";
import axios from "axios";
import './RequestBook.css'
const RequestBook = () => {
  const [searchTerm, setSearchTerm] = useState("");  // For searching books
  const [availableBooks, setAvailableBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch books based on search term
  const searchBooks = async () => {
    if (searchTerm === "") return;  // Don't search if searchTerm is empty
    setLoading(true);
    try {
      const response = await axios.get(`/api/books?search=${searchTerm}`);
      setAvailableBooks(response.data);  // Assuming the API returns a list of books
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch books");
      setLoading(false);
    }
  };

  // Function to handle the book request
  const handleRequestBook = async (bookId) => {
    try {
      await axios.post("/api/request-book", { bookId }); // Ensure this URL matches your backend route
      alert("Book requested successfully!");
    } catch (err) {
      setError("Failed to request the book");
      console.error(err.response?.data || err.message); // Log the error for debugging
    }
  };

  return (
    <div className="request-book">
      <h1>Request a Book</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a book..."
      />
      <button onClick={searchBooks} className="butt">Search</button>

      {loading && <div>Loading books...</div>}
      {error && <div>{error}</div>}

      <div className="book-list">
  {availableBooks.length === 0 ? (
    <p>No books found</p>
  ) : (
    availableBooks.map((book) => (
      <div key={book.id} className="book-card"> {/* Use book.id as the unique key */}
        <img src={book.image} alt={book.title} className="book-img" />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <button
          className="butt"
          onClick={() => handleRequestBook(book.id)}
        >
          Request Book
        </button>
      </div>
    ))
  )}
</div>
    </div>
  );
};

export default RequestBook;
