// server.js
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // Import mongoose correctly
const cookieParser = require("cookie-parser");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const maintenanceRoutes = require("./routes/maintenance");
const reportRoutes = require("./routes/reports");
const transactionRoutes = require("./routes/transactions");
const bookRoutes = require("./routes/bookRoutes");
const membershipRoutes = require("./routes/membership");
const issueBooksRoutes = require("./routes/issueBooks");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/admin");


const app = express();

// Enable CORS (adjust the origin as per your frontend's URL)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json({ limit: "50mb" })); // Increase JSON limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// Logging Middleware (placed before routes)
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Database Connection
mongoose.connect("mongodb+srv://basishkumar54:6tMRlnV42yL5d0Mw@cluster0.7vvp4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", authRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issue-books",issueBooksRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", userRoutes);
app.use(adminRoutes);
// Start the Server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
