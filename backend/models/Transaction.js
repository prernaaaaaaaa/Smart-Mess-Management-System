const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  type: {
    type: String,
    enum: ["recharge", "meal"],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Transaction", transactionSchema);