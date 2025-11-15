const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createChallenge,
  joinChallenge,
  getLeaderboard,
  getAllChallenges,
  getMyChallenges,
} = require("../controllers/challengeController");

router.post("/create", auth, createChallenge);
router.post("/join", auth, joinChallenge);
router.get("/leaderboard/:id", auth, getLeaderboard);
router.get("/all", auth, getAllChallenges); // list all challenges
router.get("/my", auth, getMyChallenges); // user joined challenges

module.exports = router;
