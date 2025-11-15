const Checkin = require("../models/Checkin");
const Habit = require("../models/Habit");

// --- Weekly data (last 7 dats) ---

exports.getWeeklyInsights = async (req, res) => {
  try {
    const userId = req.user._id;
    const habitId = req.params.id;

    let data = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);

      const checkin = await Checkin.findOne({
        user: userId,
        habit: habitId,
        date: day,
      });

      data.push({
        date: day,
        completed: checkin ? true : false,
      });
    }
    res.status(200).json({ weekly: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// --- Monthly data (last 30 days) ---

exports.getMonthlyInsights = async (req, res) => {
  try {
    const userId = req.user._id;
    const habitId = req.params.id;

    let data = [];

    for (let i = 29; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      const checkin = await Checkin.findOne({
        user: userId,
        habit: habitId,
        date: day,
      });

      data.push({
        date: day,
        completed: checkin ? true : false,
      });
    }
    res.status(200).json({ monthly: data });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// --- Success rate ---

exports.getSuccessRate = async (req, res) => {
  try {
    const userId = req.user._id;
    const habitId = req.params.id;

    const total = 30; // Last 30 days

    const compltedCount = await Checkin.countDocuments({
      habit: habitId,
      user: userId,
    });

    const successRate = ((compltedCount / total) * 100).toFixed(2);

    res.status(200).json({ successRate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// --- OverView of all habits ---

exports.getOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    const habits = await Habit.find({ user: userId });

    let summary = [];

    for (let habit of habits) {
      const compltedCount = await Checkin.countDocuments({
        habit: habit._id,
        user: userId,
      });

      summary.push({
        habitId: habit._id,
        title: habit.title,
        totalCompletions: compltedCount,
      });

      res.status(200).json({ overview: summary });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// --- Strongest habit ---

exports.getStrongestHabit = async (req, res) => {
  try {
    const userId = req.user._id;
    const habits = await Habit.find({ user: userId });

    let strongestHabit = null;
    let maxCompletions = 0;

    for (let habit of habits) {
      const compltedCount = await Checkin.countDocuments({
        habit: habit._id,
        user: userId,
      });

      if (compltedCount > maxCompletions) {
        maxCompletions = compltedCount;
        strongestHabit = habit;
      }
    }

    res.status(200).json({ strongest: strongestHabit || null });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// --- Weakest habit ---

exports.getWeakestHabit = async (req, res) => {
  try {
    const userId = req.user._id;
    const habits = await Habit.find({ user: userId });

    let weakestHabit = null;
    let minCompletions = Infinity;

    for (let habit of habits) {
      const compltedCount = await Checkin.countDocuments({
        habit: habit._id,
        user: userId,
      });

      if (compltedCount < minCompletions) {
        minCompletions = compltedCount;
        weakestHabit = habit;
      }
    }

    res.status(200).json({ weakest: weakestHabit || null });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
