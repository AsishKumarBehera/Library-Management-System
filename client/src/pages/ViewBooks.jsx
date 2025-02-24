import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/ViewBooks.css";

const ViewBooks = ({ addToMyBooks }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("Fetching books...");
        const response = await axios.get("http://localhost:2000/api/books");
        console.log("Books received:", response.data);
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err.response || err.message);
        setError("Failed to fetch books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleGetBook = (book) => {
    // addToMyBooks(book); // Add book to My Books
    navigate("/issue-books", { state: { selectedBook: book } }); // Navigate to IssueBook page
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
