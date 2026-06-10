const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

app.use("/api", authRoutes);
app.get("/", (req, res) => {
  res.send("Smart Mess Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});
const walletRoutes = require("./routes/walletRoutes");

app.use("/api", walletRoutes);
const mealRoutes = require("./routes/mealRoutes");

app.use("/api", mealRoutes);
const transactionRoutes = require("./routes/transactionRoutes");

app.use("/api", transactionRoutes);
const adminRoutes = require("./routes/adminRoutes");

app.use("/api", adminRoutes);
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT ERROR:", err);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED PROMISE:", err);
});