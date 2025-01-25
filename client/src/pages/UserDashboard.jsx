import { Link } from "react-router-dom";
import "../pages/UserDashboard.css";
import { useState } from "react";

const UserDashboard = () => {
  const [myBooks, setMyBooks] = useState([]); // State to store borrowed books

  const addToMyBooks = (book) => {
    setMyBooks((prevBooks) => [...prevBooks, book]); // Add book to the list
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Actions</h2>
        <Link to="/dashboard/view-books">
          <button className="butt">View Books</button>
        </Link>
        <Link to="/dashboard/my-books">
          <button className="butt">My Books</button>
        </Link>
        <Link to="/dashboard/request-book">
          <button className="butt">Request Book</button>
        </Link>
      </div>

      <div className="main-content">
        <h1>Welcome to the User Dashboard</h1>
        <p>Manage your books, requests, and explore our collection here.</p>
      </div>
    </div>
  );
};

export default UserDashboard;
