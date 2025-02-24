const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// ADD a new user
router.post("/users/add", async (req, res) => {
    try {
        const { name, email, role, membership } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const newUser = new User({ name, email, role, membership });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
});

// UPDATE user
router.put("/users/:id", async (req, res) => {
    try {
        const { name, email, role, membership } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role, membership },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
});

// DELETE user
router.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});

module.exports = router;
