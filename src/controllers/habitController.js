const Habit = require("../models/Habit");
const { validateHabit } = require("../utils/validators");

// Create a new habit

exports.createHabit = async (req, res) => {
  try {
    const errors = validateHabit(req.body);
    if (errors) {
      return res.status(400).json({ message: errors });
    }

    const { name, frequency, category, priority } = req.body;

    const habit = await Habit.create({
      user: req.user._id,
      name,
      frequency,
      category,
      priority,
    });

    res.status(201).json({ message: "Habit created successfully", habit });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all habits for a user

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id })
      .sort({
        createdAt: -1,
      })
      .lean();

    res.status(200).json({ habits });
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a habit

exports.updateHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const habit = await Habit.findOneAndUpdate(
      { _id: habitId, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({ message: "Habit updated successfully", habit });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a habit

exports.deleteHabit = async (req, res) => {
  try {
    const habitId = req.params.id;

    const deletedHabit = await Habit.findOneAndDelete({
      _id: habitId,
      user: req.user._id,
    });

    if (!deletedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
