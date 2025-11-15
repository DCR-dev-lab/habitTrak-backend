exports.validateHabit = ({ name, frequency }) => {
  if (!name || typeof name !== "string" || name.trim() === "") {
    return "Habit name is required and must be a non-empty string.";
  }
  const validFrequencies = ["daily", "weekly", "monthly"];
  if (!frequency || !validFrequencies.includes(frequency)) {
    return `Frequency is required and must be one of the following: ${validFrequencies.join(
      ", "
    )}.`;
  }
  return null;
};

exports.validateReminder = (time) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches "HH:MM" format
  if (!time || !timeRegex.test(time)) {
    return "Reminder time must be in 'HH:MM' format (24-hour).";
  }
  return null;
};
