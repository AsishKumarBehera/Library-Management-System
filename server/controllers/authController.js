const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// Register endpoint
const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if name was entered
        if (!name) {
            return res.status(400).json({
                error: 'Name is required',
            });
        }

        // Check if password is good
        if (!password || password.length < 6) {
            return res.status(400).json({
                error: 'Password is required and should be at least 6 characters long',
            });
        }

        // Check if email already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: 'Email is already taken',
            });
        }

        const hashedPassword = await hashPassword(password);

        // Create user in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'No user found',
            });
        }

        // Check if password matches
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).json({
                error: 'Password does not match',
            });
        }

        // Generate JWT token
        jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            
            // Set token in cookies with httpOnly flag for security
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Only over HTTPS in production
                maxAge: 60 * 60 * 1000, // Token expiration of 1 hour
            }).json({ user, token });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get profile endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, token missing' });
    }

    // Verify the token using jwt.verify
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized, invalid token' });
        }
        res.json(user);
    });
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
};
