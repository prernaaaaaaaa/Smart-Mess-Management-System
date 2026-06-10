const express = require("express");
const router = express.Router();

const { rechargeWallet, getBalance } = require("../controllers/walletController");
const authMiddleware = require("../middleware/authMiddleware");

// Recharge wallet
router.post("/wallet/recharge", authMiddleware, rechargeWallet);

// Get wallet balance
router.get("/wallet/balance", authMiddleware, getBalance);

module.exports = router;