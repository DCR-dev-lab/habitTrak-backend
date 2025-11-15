const mongoose = require("mongoose");

// Habit Schema
const habitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },
    category: { type: String, trim: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Habit || mongoose.model("Habit", habitSchema);

