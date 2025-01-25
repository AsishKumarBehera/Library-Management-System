const express = require('express');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile'); // Updated to use Profile model
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// GET /profile - View user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const userProfile = await Profile.findById(req.userId).select('-password'); // Exclude password field
    if (!userProfile) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /profile - Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.userId, // Use the user ID from the JWT token
      { email, password, username },
      { new: true } // Return the updated profile
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedProfile); // Return the updated profile
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// PUT /change-password - Change user password
router.put('/change-password', authenticateUser, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const userProfile = await Profile.findById(req.userId);
    if (!userProfile) return res.status(404).json({ error: 'User not found' });

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, userProfile.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect current password' });

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userProfile.password = hashedPassword;

    await userProfile.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
