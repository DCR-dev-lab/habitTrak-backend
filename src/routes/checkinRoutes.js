const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Check-in Controllers
const {
  markCheckin,
  unCheck,
  gethistory,
  getStreak,
} = require("../controllers/checkinController");

// Check-in Routes
router.post("/mark", auth, markCheckin);
router.post("/uncheck", auth, unCheck);
router.get("/history/:id", auth, gethistory);
router.get("/streak/:id", auth, getStreak);

module.exports = router;
