const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Reminder Controllers
const { setReminder, getReminder } = require("../controllers/reminderController");

// Reminder Routes
router.put("/set", auth, setReminder);
router.get("/", auth, getReminder);

module.exports = router;