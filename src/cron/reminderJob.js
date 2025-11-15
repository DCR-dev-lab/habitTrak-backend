const cron = require("node-cron");
const User = require("../models/user");

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const currentTime = now.toTimeString().substring(0, 5); // "HH:MM"

  const users = await User.find({ reminderTime: currentTime });

  users.forEach((user) => {
    console.log(
      `⏰ Reminder for ${user.username}: Don't forget to check your habits today!`
    );
  });
});
