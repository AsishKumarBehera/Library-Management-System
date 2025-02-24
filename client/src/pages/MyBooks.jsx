import { useState, useEffect } from "react";
import axios from "axios";
import "./MyBooks.css";

const MyBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/issue-books");
        setIssuedBooks(response.data);
      } catch (error) {
        console.error("Error fetching issued books:", error);
        setError("Failed to load issued books.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssuedBooks();
  }, []);

  if (loading) return <div>Loading issued books...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="my-books-container">
      <h2>My Books</h2>
      {issuedBooks.length === 0 ? (
        <p>No books issued yet.</p>
      ) : (
        <div className="books-grid">
          {issuedBooks.map((issued) => {
            const book = issued.book || {}; // Ensure `book` object exists

            return (
              <div key={issued._id} className="book-card">
                <h3>{book.title || "N/A"}</h3>
                <p>{book.author || "N/A"}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
