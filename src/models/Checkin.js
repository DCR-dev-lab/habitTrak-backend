const mongoose = require("mongoose");

// Checkin Schema
const checkinSchema = new mongoose.Schema(
  {
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamp: true }
);

module.exports =
  mongoose.models.Checkin || mongoose.model("Checkin", checkinSchema);
