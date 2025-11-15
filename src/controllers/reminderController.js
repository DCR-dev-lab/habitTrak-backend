const { validateReminder } = require("../utils/validators");

exports.setReminder = async (req, res) => {
  try {
    const { reminderTime } = req.body; //format "HH:MM"

    const error = validateReminder(reminderTime);
    if (error) {
      return res.status(400).json({ message: error });
    }

    req.user.reminderTime = reminderTime;

    await req.user.save();

    res.status(200).json({ message: "Reminder time updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getReminder = async (req, res) => {
  try {
    res.status(200).json({ reminderTime: req.user.reminderTime });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
