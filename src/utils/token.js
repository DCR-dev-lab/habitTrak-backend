const jwt = require("jsonwebtoken");

// Function to generate JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}