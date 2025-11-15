require("dotenv").config(); // Load environment variables
require("./src/cron/reminderJob"); // Initialize the reminder cron job

const mongoose = require("mongoose");
const app = require("./src/app");

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
