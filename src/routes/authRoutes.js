const express = require("express");
const router = express.Router();

// Auth Controllers
const { signup, login } = require("../controllers/authController");

// Auth Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
