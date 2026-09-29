import Signup from "../models/signup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { phone, password } = req.body;

    // 1. Validate input
    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone and password are required",
      });
    }

    // 2. Clean phone
    const cleanPhone = phone.trim();

    // 3. Find user
    const user = await Signup.findOne({
      phone: cleanPhone,
    });

    // 4. Don't reveal whether phone exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password",
      });
    }

    // 5. Compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password",
      });
    }

    // 6. JWT secret check
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");

      return res.status(500).json({
        success: false,
        message: "Authentication configuration error",
      });
    }

    // 7. Create access token
    const accessToken = jwt.sign(
      {
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "10d",
      }
    );

    // 8. Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",

      accessToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.age,
      },
    });

  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};