const User = require("../models/User");
const Transaction = require("../models/Transaction");

const scanMeal = async (req, res) => {
  try {
    const { mealType, hostel } = req.body;

    // 🔐 Hostel restriction
    if (req.user.hostel !== hostel) {
      return res.status(403).json({
        message: "Access denied: Wrong hostel"
      });
    }

    // 🍽️ Meal cost
    let cost = 0;

    if (mealType === "breakfast") cost = 25;
    else if (mealType === "lunch") cost = 40;
    else if (mealType === "dinner") cost = 31;
    else if (mealType === "snacks") cost = 10;
    else {
      return res.status(400).json({ message: "Invalid meal type" });
    }

    const user = await User.findById(req.user.userId);

    // 💰 Check balance
    if (user.wallet_balance < cost) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    // ➖ Deduct balance
    user.wallet_balance -= cost;
    await user.save();

    // 🧾 Save transaction
    await Transaction.create({
      userId: user._id,
      amount: cost,
      type: "debit",
      description: `${mealType} meal`
    });

    res.json({
      message: "Meal scanned successfully",
      balance: user.wallet_balance
    });

  } catch (error) {
    console.log("SCAN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { scanMeal };