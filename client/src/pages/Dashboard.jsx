import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
// import MyProfile from './MyProfile';
import { toast } from 'react-hot-toast'; 
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [view, setView] = useState('dashboard'); // Manage current view
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (!role) {
      navigate('/'); // Redirect to login if no role found
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  // Handle Logout: Clears data and redirects to login page
  const handleLogout = () => {
    localStorage.clear(); // Clear all stored user data
    toast.success('Logged out successfully!'); // Optional: Add a success toast
    navigate('/'); // Redirect to login
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h2>Menu</h2>
        <button onClick={() => setView('dashboard')}>Dashboard</button>
        {/* <button onClick={() => setView('profile')}>My Profile</button> */}
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {view === 'dashboard' && (
          <div>
            {userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />}
          </div>
        )}
        {view === 'profile' && <MyProfile />}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
