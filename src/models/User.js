const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const salt = parseInt(process.env.SALT_ROUNDS) || 10;

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, tirm: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, tirm: true },
    reminderTime: { type: String, default: "20:00" }, // 8 PM default
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
