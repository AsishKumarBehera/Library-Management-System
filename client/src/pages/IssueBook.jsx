import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./IssueBook.css";

const IssueBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBook = location.state?.selectedBook || null;

  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [bookId, setBookId] = useState(selectedBook ? selectedBook._id : "");
  const [authorName, setAuthorName] = useState(selectedBook ? selectedBook.author : "");
  const [bookImage, setBookImage] = useState(selectedBook ? selectedBook.image : "");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const defaultReturnDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 15);
    return date.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, issuedResponse] = await Promise.all([
          axios.get("http://localhost:2000/api/books"),
          axios.get("http://localhost:2000/api/issue-books"),
        ]);

        setBooks(booksResponse.data);
        setIssuedBooks(issuedResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookSelection = (e) => {
    const selectedBookId = e.target.value;
    setBookId(selectedBookId);
    const selectedBook = books.find((book) => book._id === selectedBookId);
    setAuthorName(selectedBook ? selectedBook.author : "");
    setBookImage(selectedBook ? selectedBook.image : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookId || !issueDate) {
      setError("Book and Issue Date are mandatory.");
      return;
    }

    try {
      // Send the issued book details to backend
      const response = await axios.post("http://localhost:2000/api/issue-books", {
        bookId,
        issueDate,
        returnDate,
        remarks,
      });

      setSuccessMessage("Book Issued Successfully!");
      setError("");

      // Add the issued book to "My Books" (in your case, it can be saved in a specific "MyBooks" collection)
      const updatedIssuedBooks = await axios.get("http://localhost:2000/api/issue-books");
      setIssuedBooks(updatedIssuedBooks.data);

      // Redirect to the "MyBooks" page
      navigate("/my-books");
    } catch (error) {
      setError("Failed to issue the book. Please try again.");
    }
  };

  const handleReturnBook = async (issueId) => {
    try {
      await axios.delete(`http://localhost:2000/api/issue-books/${issueId}`);
      setSuccessMessage("Book returned successfully!");
      setIssuedBooks((prev) => prev.filter((book) => book._id !== issueId));
    } catch (error) {
      setError("Failed to return the book. Please try again.");
    }
  };

  if (loading) return <div>Loading data...</div>;

  return (
    <div className="issue-book-container">
      <h2>Issue a Book</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <label>Book Name (Mandatory):</label>
        <select value={bookId} onChange={handleBookSelection} required>
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>

        <label>Author Name:</label>
        <input type="text" value={authorName} readOnly />

        <label>Issue Date:</label>
        <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} min={today} required />

        <label>Return Date (Max 15 days ahead):</label>
        <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} min={today} max={defaultReturnDate} required />

        <label>Remarks (Optional):</label>
        <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />

        <button type="submit">Issue Book</button>
      </form>

      <h2>Issued Books</h2>
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.map((issued) => (
            <tr key={issued._id}>
              <td>{issued.book?.title || "N/A"}</td>
              <td>{issued.book?.author || "N/A"}</td>
              <td>{issued.issueDate}</td>
              <td>{issued.returnDate}</td>
              <td>
                <button onClick={() => handleReturnBook(issued._id)}>Return</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueBook;
