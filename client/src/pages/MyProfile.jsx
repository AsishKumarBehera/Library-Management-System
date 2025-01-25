import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './MyProfile.css';

const MyProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        // Ensure the token is retrieved from localStorage
        const token = localStorage.getItem('authToken');
    
        if (!token) {
          toast.error('You are not logged in.');
          return;
        }
    
        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setProfile(response.data); // Populate the profile data
      } catch (error) {
        toast.error('Error fetching profile data');
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('You are not logged in.');
      return;
    }
  
    try {
      const response = await axios.put(
        'http://localhost:3000/api/user/profile', // Your API endpoint
        { email, password, username }, // Data to update
        {
          headers: { Authorization: `Bearer ${token}` }, // Include the token
        }
      );
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error(error);
    }
  };
  

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        '/api/user/change-password',
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      );
      toast.success('Password changed successfully!');
      setLoading(false);
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      toast.error('Error changing password');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>My Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={profile.email} disabled />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <h3>Change Password</h3>
      <form onSubmit={handlePasswordChange}>
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
