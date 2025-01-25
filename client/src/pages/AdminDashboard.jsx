import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/AdminDashboard.css";

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState("manage-users");

  return (
    <div className="admin-dashboard">
      <div className="side-bar">
        <h2 className="adm">Admin Dashboard</h2>
        <ul className="des">
          <li onClick={() => setCurrentPage("add-book")}>
            <Link to="#">Add Book</Link>
          </li>
          <li onClick={() => setCurrentPage("manage-users")}>
            <Link to="#">Manage Users</Link>
          </li>
          <li onClick={() => setCurrentPage("view-requests")}>
            <Link to="#">View Requests</Link>
          </li>
          <li onClick={() => setCurrentPage("generate-reports")}>
            <Link to="#">Generate Reports</Link>
          </li>
        </ul>
      </div>
      
      <div className="main-content">
        {currentPage === "add-book" && (
          <div>
            <h3>Add New Book</h3>
            {/* Add Book Form */}
            <form>
              <label>Title:</label>
              <input type="text" placeholder="Book Title" />
              <label>Author:</label>
              <input type="text" placeholder="Author Name" />
              <label>Category:</label>
              <input type="text" placeholder="Category" />
              <label>Copies Available:</label>
              <input type="number" placeholder="Number of Copies" />
              <button type="submit">Add Book</button>
            </form>
          </div>
        )}

        {currentPage === "manage-users" && (
          <div>
            <h3>Manage Users</h3>
            {/* List Users */}
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Loop through users */}
                <tr>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>User</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
                {/* Add more rows for other users */}
              </tbody>
            </table>
          </div>
        )}

        {currentPage === "view-requests" && (
          <div>
            <h3>View Book Requests</h3>
            {/* List of Book Requests */}
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Book</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>JavaScript for Beginners</td>
                  <td>Pending</td>
                  <td>
                    <button>Approve</button>
                    <button>Reject</button>
                  </td>
                </tr>
                {/* Add more rows for other requests */}
              </tbody>
            </table>
          </div>
        )}

        {currentPage === "generate-reports" && (
          <div>
            <h3>Generate Reports</h3>
            {/* Generate reports like total requests, available books */}
            <button>Generate User Report</button>
            <button>Generate Book Report</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
