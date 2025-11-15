const Challenge = require("../models/Challenge");

// Create challenge (creator auto-joined)
exports.createChallenge = async (req, res) => {
  try {
    const { title, description } = req.body;
    const challenge = await Challenge.create({
      title,
      description,
      participants: [{ user: req.user._id, score: 0 }],
    });
    res.json({ message: "Challenge created", challenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Join a challenge
exports.joinChallenge = async (req, res) => {
  try {
    const { challengeId } = req.body;
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return res.status(404).json({ message: "Not found" });

    const already = challenge.participants.some(
      (p) => p.user.toString() === req.user._id.toString()
    );

    if (already) {
      return res.json({ message: "Already joined", challenge });
    }

    challenge.participants.push({ user: req.user._id, score: 0 });
    await challenge.save();

    res.json({ message: "Joined challenge", challenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get leaderboard (sorted)
exports.getLeaderboard = async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findById(id).populate(
      "participants.user",
      "username email"
    );
    if (!challenge) return res.status(404).json({ message: "Not found" });

    challenge.participants.sort((a, b) => b.score - a.score);

    res.json({
      challengeTitle: challenge.title,
      leaderboard: challenge.participants,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all challenges
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();

    const secure_data = challenges.map((c) => ({
      id: c._id,
      title: c.title,
      description: c.description,
      participantsCount: c.participants.length,
    }));

    res.json({ challenges: secure_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get challenges current user participates in
exports.getMyChallenges = async (req, res) => {
  try {
    const userId = req.user._id;
    const challenges = await Challenge.find({
      "participants.user": userId,
    })
      .select("-participants")
      .lean();

    res.json({ challenges });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
