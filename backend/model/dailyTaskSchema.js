const mongoose = require("mongoose");

const dailyTaskSchema = new mongoose.Schema({
  dailyTaskName: {
    type: String,
  },
  dailyTaskCreatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Dalies", dailyTaskSchema);
