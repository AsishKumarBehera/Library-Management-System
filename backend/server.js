// backend/server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();  // Load environment variables from a .env file

const app = express();
const port = 3003;  // Backend port

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse incoming JSON request bodies

// Dummy users (replace with a real database in production)
const users = [
  {
    id: 1,
    email: "test@example.com",
    password: bcrypt.hashSync("password123", 10), // Store hashed password
  },
  {
    id: 2,
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10), // Store hashed password
  },
];

// POST login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare the hashed password with the one provided
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
