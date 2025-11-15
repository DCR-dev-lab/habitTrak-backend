const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Insights Controllers
const {
  getWeeklyInsights,
  getMonthlyInsights,
  getSuccessRate,
  getOverview,
  getStrongestHabit,
  getWeakestHabit,
} = require("../controllers/insightsController");

// Insights Routes
router.get("/weekly/:id", auth, getWeeklyInsights);
router.get("/monthly/:id", auth, getMonthlyInsights);
router.get("/success-rate/:id", auth, getSuccessRate);
router.get("/overview", auth, getOverview);
router.get("/strongest", auth, getStrongestHabit);
router.get("/weakest", auth, getWeakestHabit);

module.exports = router;
