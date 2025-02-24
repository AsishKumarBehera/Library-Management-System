import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./Dashboard.css";
import { FiHome, FiLogOut, FiUser, FiMenu, FiX } from "react-icons/fi";
import AdminDashboard from "./AdminDashboard/AdminDashboard"; 
import UserDashboard from "./UserDashboard";  

const Dashboard = () => {
  const [userRole, setUserRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Get current route

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/"); // Redirect to login if no role found
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <h2 className="library-title">📚 LMS</h2>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate("/dashboard")}>
            <FiHome className="icon" /> Home
          </button>
          <button className="nav-btn" onClick={() => navigate("/profile")}>
            <FiUser className="icon" /> My Profile
          </button>
          <button className="nav-btn logout-btn" onClick={handleLogout}>
            <FiLogOut className="icon" /> Logout
          </button>
        </div>
        <button className="menu-toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </button>
      </nav>

      {/* Sidebar Menu for Mobile */}
      <div className={`sidebar-menu ${menuOpen ? "open" : ""}`}>
        <button className="nav-btn" onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>
          <FiHome className="icon" /> Home
        </button>
        <button className="nav-btn" onClick={() => { navigate("/profile"); setMenuOpen(false); }}>
          <FiUser className="icon" /> My Profile
        </button>
        <button className="nav-btn logout-btn" onClick={handleLogout}>
          <FiLogOut className="icon" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Show Admin/User Dashboard ONLY on "/dashboard", NOT on subroutes */}
        {location.pathname === "/dashboard" && (userRole === "admin" ? <AdminDashboard /> : <UserDashboard />)}
        
        {/* Load nested components (like Manage Books) */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
