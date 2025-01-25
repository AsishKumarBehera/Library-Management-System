import { useState, useEffect } from "react";
import axios from "axios";
import "../pages/ViewBooks.css";

const ViewBooks = ({ addToMyBooks }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books"); // Adjust URL if needed
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleGetBook = (book) => {
    addToMyBooks(book);  // Call the function passed via props to add to My Books
  };

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="view-books">
      <h1>Available Books</h1>
      <div className="books-list">
        {books.map((book, index) => (
          <div key={book.id || index} className="book-card">
            <img src={book.image} alt={book.title} className="book-img" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.category}</p>
            <button className="butt" onClick={() => handleGetBook(book)}>
              Get Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBooks;
