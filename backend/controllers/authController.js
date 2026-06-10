const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 REGISTER (scholarNumber based)
const registerUser = async (req, res) => {
  try {
    const { scholarNumber, password, hostel } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ scholarNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      scholarNumber,
      password: hashedPassword,
      hostel
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


// 🔐 LOGIN (scholarNumber based)
const loginUser = async (req, res) => {
  try {
    const { scholarNumber, password } = req.body;

    // find user
    const user = await User.findOne({ scholarNumber });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("LOGIN BODY:", req.body);
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token (🔥 include hostel)
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        hostel: user.hostel   // 🔥 important
      },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };