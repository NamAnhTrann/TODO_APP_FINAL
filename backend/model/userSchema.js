const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },

  userLastName: {
    type: String,
    required: true,
    default: "none",
  },

  userFirstName: {
    type: String,
    required: true,
    default: "none",
  },

  userEmail: {
    type: String,
    required: true,
    default: "none",
  },

  userPhoneNumber: {
    type: String,
    required: false,
    default: "0",
  },

  userCreatedAt: {
    type: Date,
    default: Date.now,
  },

  userAddress: {
    type: String,
    required: false,
    default: "none",
  },

  userUpdatedAt: {
    type: Date,
  },

  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: false,
    },
  ],

  daily: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dalies",
      required: false,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
