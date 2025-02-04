import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Authentication = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('start'); // Tracks current page: 'start', 'register', or 'login'
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Hardcoded admin credentials
  const adminCredentials = {
    email: 'admin@gmail.com',
    password: '123456',
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      // Check if admin credentials
      if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem('userRole', 'admin'); // Store role as admin
        localStorage.setItem('userEmail', email); // Store email for reference
        navigate('/dashboard'); // Navigate to dashboard
        toast.success('Logged in as Admin!');
        return;
      }

      // Handle regular user login
      const response = await axios.post('/login', { email, password });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({}); // Clear form
        localStorage.setItem('userRole', 'user'); // Store role as user
        localStorage.setItem('userEmail', email); // Store email for reference
        navigate('/dashboard'); // Navigate to dashboard
        toast.success('Logged in successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please try again.');
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post('/register', { name, email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({}); // Clear form
        toast.success('Registration Successful! Please Login.');
        setCurrentPage('login'); // Switch to login page
      }
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <>
    <h1 className='nt'>Library Management System</h1>
    <div>
      {currentPage === 'start' && (
        <div>
          <button className="top-left-button" onClick={() => setCurrentPage('register')}>Register</button>
        </div>
      )}

      {currentPage === 'register' && (
        <div className='reg'>
        <form onSubmit={registerUser}>
          <h3>Register</h3>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name..."
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={data.email || ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password..."
            value={data.password || ""}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button type="submit">Register</button>
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setCurrentPage('login')}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              Login here
            </span>
          </p>
        </form>
        </div>
      )}

      {currentPage === 'login' && (
        <div className='reg'>
          <form onSubmit={loginUser}>
          <h3>Login</h3>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={data.email || ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password..."
            value={data.password || ""}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => setCurrentPage('register')}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              Register here
            </span>
          </p>
        </form>
        </div>
      )}
    </div>
    </>
  );
};

export default Authentication;
