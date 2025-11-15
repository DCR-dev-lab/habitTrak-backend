const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Authentication Middleware
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password"); // Exclude password field
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
