import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/AdminDashboard.css";
import Maintenance from "./Maintenance";
import axios from 'axios';

const AdminDashboard = () => {


  const [currentPage, setCurrentPage] = useState("manage-users");
  const [users, setUsers] = useState([]); // Store user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Replace with your endpoint
        setUsers(response.data); // Store fetched users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="side-bar">
        <h2 className="adm">Admin Dashboard</h2>
        <ul className="des">
          <li onClick={() => setCurrentPage("manage-users")}>
            <Link to="#">Manage Users</Link>
          </li>
          <li onClick={() => setCurrentPage("maintenance")}>
            <Link to="#">Maintenance</Link>
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

{currentPage === 'manage-users' && (
          <div>
            <h3>Manage Users</h3>
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
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role || 'User'}</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
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
        {currentPage === "maintenance" && (<Maintenance />)}
      </div>
    </div>
  );
};

export default AdminDashboard;
