const User = require("../models/User");
const Transaction = require("../models/Transaction");

const rechargeWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    const userId = req.user.userId;

    const user = await User.findById(userId);

    user.wallet_balance += amount;

    await user.save();

    // ✅ transaction must be INSIDE async function
    await Transaction.create({
      user_id: userId,
      type: "recharge",
      amount: amount,
      description: "Wallet recharge"
    });

    res.json({
      message: "Wallet recharged successfully",
      balance: user.wallet_balance
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    res.json({
      balance: user.wallet_balance
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { rechargeWallet, getBalance };