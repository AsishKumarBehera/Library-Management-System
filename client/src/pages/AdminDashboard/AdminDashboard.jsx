import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../AdminDashboard/AdminDashboard.css";

const AdminDashboard = () => {
  const [bookProgress, setBookProgress] = useState(0);
  const [userProgress, setUserProgress] = useState(0);
  const [transactionProgress, setTransactionProgress] = useState(0);

  // Fetch the data for counts and progress (replace with your actual API calls)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace these URLs with your actual API endpoints
        const bookResponse = await fetch("http://localhost:2000/api/books/count");
        const userResponse = await fetch("http://localhost:2000/api/users/count");
        const transactionResponse = await fetch("http://localhost:2000/api/transactions/count");

        const bookData = await bookResponse.json();
        const userData = await userResponse.json();
        const transactionData = await transactionResponse.json();

        // Assuming you also have the total counts, calculate progress as a percentage
        const totalBooks = 100; // Replace with actual total count of books
        const totalUsers = 200; // Replace with actual total count of users
        const totalTransactions = 500; // Replace with actual total count of transactions

        setBookProgress((bookData.count / totalBooks) * 100);
        setUserProgress((userData.count / totalUsers) * 100);
        setTransactionProgress((transactionData.count / totalTransactions) * 100);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <h2>Admin Dashboard</h2>
        <ul className="nav-links">
          <li><Link to="manage-book">Manage Books</Link></li>
          <li><Link to="manage-user">Manage Users</Link></li>
          <li><Link to="transactions">Transactions</Link></li>
          <li><Link to="generate-report">Generate Reports</Link></li>
        </ul>
      </nav>
      <div className="main-content">
        <h3>Progress Overview</h3>
        <div className="progress-container">
          <div className="progress-item">
            <label>Manage Books</label>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${bookProgress}%` }}></div>
            </div>
            <span>{bookProgress.toFixed(2)}%</span>
          </div>
          <div className="progress-item">
            <label>Manage Users</label>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${userProgress}%` }}></div>
            </div>
            <span>{userProgress.toFixed(2)}%</span>
          </div>
          <div className="progress-item">
            <label>Transactions</label>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${transactionProgress}%` }}></div>
            </div>
            <span>{transactionProgress.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
