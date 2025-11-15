const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Habit Controllers
const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} = require("../controllers/habitController");

// Habit Routes
router.post("/", auth, createHabit);
router.get("/", auth, getHabits);
router.put("/:id", auth, updateHabit);
router.delete("/:id", auth, deleteHabit);

module.exports = router;
