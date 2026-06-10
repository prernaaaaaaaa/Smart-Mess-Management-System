const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getAdminStats = async (req, res) => {
  try {
    // total users
    const totalUsers = await User.countDocuments();

    // total meals
    const totalMeals = await Transaction.countDocuments({
      type: "meal"
    });

    // total revenue (sum of meal transactions)
    const revenueData = await Transaction.aggregate([
      { $match: { type: "meal" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      totalUsers,
      totalMeals,
      totalRevenue
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminStats };