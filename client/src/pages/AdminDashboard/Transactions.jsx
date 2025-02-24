import { useState, useEffect } from "react";
import axios from "axios";
import "./Transactions.css";

const Transactions = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/issue-books");
        setIssuedBooks(response.data);
      } catch (error) {
        setError("Failed to load issued books.");
      }
    };
    fetchIssuedBooks();
  }, []);

  const calculateFine = (returnDate) => {
    const today = new Date();
    const dueDate = new Date(returnDate);
    if (today > dueDate) {
      const lateDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
      return lateDays * 5;
    }
    return 0;
  };

  const handleReturnBook = async (issueId, returnDate) => {
    const fineAmount = calculateFine(returnDate);
    const confirmReturn = window.confirm(
      fineAmount > 0
        ? `This book has a late fine of ₹${fineAmount}. Confirm return?`
        : "Confirm return?"
    );

    if (!confirmReturn) return;

    try {
      await axios.delete(`http://localhost:2000/api/issue-books/${issueId}`);
      setSuccessMessage("Book returned successfully!");
      setIssuedBooks((prev) => prev.filter((book) => book._id !== issueId));
    } catch (error) {
      setError("Failed to return the book. Please try again.");
    }
  };

  return (
    <div className="transactions-container">
      <h2>Issued Books & Returns</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Fine (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.map((issued) => (
            <tr key={issued._id}>
              <td>{issued.book?.title || "N/A"}</td>
              <td>{issued.book?.author || "N/A"}</td>
              <td>{issued.issueDate.split("T")[0]}</td>
              <td>{issued.returnDate.split("T")[0]}</td>
              <td>₹{calculateFine(issued.returnDate)}</td>
              <td>
                <button onClick={() => handleReturnBook(issued._id, issued.returnDate)}>
                  Return Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
