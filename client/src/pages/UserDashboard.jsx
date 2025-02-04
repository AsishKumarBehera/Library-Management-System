import { Link } from "react-router-dom";
import "../pages/UserDashboard.css";
import { useState } from "react";
import Membership from "./Membership";

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [books] = useState([
    "The Alchemist",
  ]); // Example book list
  const [activeTab, setActiveTab] = useState("main");

  const [filteredBooks, setFilteredBooks] = useState(books); // Filtered book list

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter books based on the search term
    const results = books.filter((book) =>
      book.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBooks(results);
  };

  return (
    <div className="dashboard-cont">
      {/* Top Row */}
      <div className="dashboard">
      <div className="top-row">
        {/* Actions on the Left */}
        <div className="left-actions">
          <h2>Actions</h2>
        </div>

        {/* Search Bar and Buttons on the Right */}
        <div className="right-options">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <Link to="/dashboard/view-books">
            <button className="butt">View Books</button>
          </Link>
          <Link to="/dashboard/request-book">
            <button className="butt">Request Book</button>
          </Link>
          <Link to="/dashboard/issue-book">
              <button className="butt">Issue Book</button>
            </Link>
          <Link to="/dashboard/my-books">
            <button className="butt">My Books</button>
          </Link>
          <Link to="/dashboard/membership">
              <button className="butf">Membership</button>
            </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to the User Dashboard</h1>
        <p>Manage your books, requests, and explore our collection here.</p>
        {/* Display Search Results */}
        <div className="search-results">
          <h2>Search Results</h2>
          {filteredBooks.length > 0 ? (
            <ul>
              {filteredBooks.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          ) : (
            <p>No books found matching your search.</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserDashboard;
