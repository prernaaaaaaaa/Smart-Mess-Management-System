const express = require("express");
const router = express.Router();

const { scanMeal } = require("../controllers/mealController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/meal/scan", authMiddleware, scanMeal);

module.exports = router;