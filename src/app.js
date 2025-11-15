const express = require("express");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");
const checkinRoutes = require("./routes/checkinRoutes");
const insightsRoutes = require("./routes/insightsRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

// Initialize express app
const app = express();

// Middlewares
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/checkin", checkinRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/challenge", challengeRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Habit Tracker Backend Running 🚀");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
