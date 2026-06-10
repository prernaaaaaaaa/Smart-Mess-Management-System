const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  scholarNumber: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "student"
  },

  hostel: {
    type: String,
    required: true   // 🔥 important
  },

  wallet_balance: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);