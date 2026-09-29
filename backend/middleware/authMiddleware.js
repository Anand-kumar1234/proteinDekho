import jwt from "jsonwebtoken";
import Signup from "../models/signup.js";

// ==========================================
// AUTH MIDDLEWARE
// ==========================================

const authMiddleware = async (req, res, next) => {
  try {

    // ------------------------------------------
    // 1. Get Authorization Header
    // ------------------------------------------

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    // ------------------------------------------
    // 2. Check Bearer Token Format
    // ------------------------------------------

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    // ------------------------------------------
    // 3. Extract Token
    // ------------------------------------------

    const token = authHeader.split(" ")[1];

    // 🆕 NEW:
    // Agar "Bearer " ke baad token nahi hai
    // to request ko reject karenge.
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    // ------------------------------------------
    // 4. Verify JWT
    // ------------------------------------------

    // 🆕 NEW:
    // Signup ke time hum JWT ke andar:
    //
    // {
    //   userId: newUser._id
    // }
    //
    // save kar rahe hain.
    //
    // Isliye jwt.verify() ke baad
    // decoded.userId milega.

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 🆕 NEW:
    // Agar token valid hai lekin userId nahi hai,
    // to request reject karenge.
    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // ------------------------------------------
    // 5. Find User
    // ------------------------------------------

    const user = await Signup.findById(
      decoded.userId
    ).select("-password");

    // ------------------------------------------
    // 6. User Exists Check
    // ------------------------------------------

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ------------------------------------------
    // 7. Attach User To Request
    // ------------------------------------------

    // 🆕 NEW:
    // Ab controller ke andar:
    //
    // req.user
    //
    // se logged-in user ka data milega.
    //
    // Example:
    // req.user._id
    // req.user.name
    // req.user.email

    req.user = user;

    // ------------------------------------------
    // 8. Continue Request
    // ------------------------------------------

    next();

  } catch (error) {

    // ------------------------------------------
    // 9. Token Expired
    // ------------------------------------------

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
      });
    }

    // ------------------------------------------
    // 10. Invalid Token
    // ------------------------------------------

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    // ------------------------------------------
    // 11. Other Authentication Error
    // ------------------------------------------

    console.error(
      "Auth middleware error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authMiddleware;