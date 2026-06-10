const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions = await Transaction.find({ user_id: userId })
      .sort({ createdAt: -1 });

    res.json(transactions);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTransactions };