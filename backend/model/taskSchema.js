const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },

  taskDescription: {
    type: String,
    required: false,
  },

  taskPriority: {
    type: String,
    enum: ["HIGH", "MEDIUM", "LOW"],
    required: false,
    default: "LOW",
  },

  taskCompletion: {
    type: String,
    enum: ["DONE", "PENDING", "NOT DONE"],
    default: "NOT DONE",
    required: false,
  },

  taskCreatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Task", taskSchema);
