const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        message: "No token, access denied"
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store decoded payload in request
    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;