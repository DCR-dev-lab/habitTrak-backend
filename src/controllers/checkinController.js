const Checkin = require("../models/Checkin");
const Challenge = require("../models/Challenge");

// Mark a habit as completed for today

exports.markCheckin = async (req, res) => {
  try {
    const { habitId } = req.body;
    const userId = req.user._id;

    // Check if check-in already exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingCheckin = await Checkin.findOne({
      user: userId,
      habit: habitId,
      date: { $gte: today },
    });

    if (existingCheckin) {
      return res
        .status(400)
        .json({ message: "Habit already checked in for today" });
    }

    const checkin = await Checkin.create({
      user: userId,
      habit: habitId,
      date: new Date(),
      completed: true,
    });

    await Challenge.updateMany(
      { "participants.user": req.user._id },
      { $inc: { "participants.$.score": 1 } }
    );

    res.status(201).json({ message: "Check-in marked successfully", checkin });
  } catch (error) {
    res.stauts(500).json({ message: "Server error", error });
  }
};

// Unmark a habit for today

exports.unCheck = async (req, res) => {
  try {
    const { habitId } = req.body;
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkin = await Checkin.findOneAndDelete({
      user: userId,
      habit: habitId,
      date: { $gte: today },
    });

    if (!checkin) {
      return res
        .status(404)
        .json({ message: "No check-in found for today to uncheck" });
    }

    await Challenge.updateMany(
      { "participants.user": req.user._id },
      { $inc: { "participants.$.score": -1 } }
    );

    res.status(200).json({ message: "Check-in removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get check-in history for a habit

exports.gethistory = async (req, res) => {
  try {
    const habitId = req.params.id;
    const history = await Checkin.find({ habit: habitId })
      .sort({ date: -1 })
      .lean();

    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Calculate streaks for a habit

exports.getStreak = async (req, res) => {
  try {
    const habitId = req.params.id;
    const userId = req.user._id;

    const checkins = await Checkin.find({ habit: habitId, user: userId }).sort({
      date: -1,
    });

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const checkin of checkins) {
      const checkinDate = new Date(checkin.date);
      checkinDate.setHours(0, 0, 0, 0);
      if (checkinDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.status(200).json({ streak });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  };
};
