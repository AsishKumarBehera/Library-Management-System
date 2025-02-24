import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../pages/UserDashboard.css";

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/books");
        setBooks(response.data);
        setFilteredBooks(response.data); // Initially, all books are displayed
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter books dynamically
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBooks(results);
  };

  return (
    <div className="dashboard-cont">
      <div className="dashboard">
        <div className="top-row">
          <div className="left-actions">
            <h2>User Dashboard</h2>
          </div>
          <div className="right-options">
            <input
              type="text"
              className="search-input"
              placeholder="Search books..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="search-results">
            <h2>Search Results:</h2>
            <ul>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <li key={book.id || book._id || index} className="search-item">
                    <Link to={`/view-books`}>{book.title}</Link>
                  </li>
                ))
              ) : (
                <li>No books found</li>
              )}
            </ul>
          </div>
        )}

        {/* Main Content */}
        <div className="main-content">
          <h1>Welcome to the Library</h1>
          <p>Manage your books, requests, and explore our collection here.</p>

          <div className="card-container">
            <Link to="/view-books">
              <div className="viewss">
                <h2 className="viw">View Books</h2>
                <img
                  src="https://www.realsimple.com/thmb/KrGb42aamhHKaMzWt1Om7U42QsY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/great-books-for-anytime-2000-4ff4221eb1e54b659689fef7d5e265d5.jpg"
                  alt="View Books"
                />
              </div>
            </Link>
            <Link to="/issue-books">
              <div className="viewss">
                <h2 className="viw">Issue Book</h2>
                <img
                  src="https://thehill.com/wp-content/uploads/sites/2/2022/04/ca_libraryvsmovie_012720istock.jpg?w=1280"
                  alt="Issue Book"
                />
              </div>
            </Link>
            <Link to="/my-books">
              <div className="viewss">
                <h2 className="viw">My Book</h2>
                <img
                  src="https://i.pinimg.com/474x/a7/7a/8b/a77a8b275f7c0894bcf0f8094fde7ad6.jpg"
                  alt="My Book"
                />
              </div>
            </Link>
            <Link to="/membership">
              <div className="viewss">
                <h2 className="viw">Membership</h2>
                <img
                  src="https://i.pinimg.com/736x/41/59/77/415977fa0031e50a4d56ef456ca88a9b.jpg"
                  alt="Membership"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Library Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
