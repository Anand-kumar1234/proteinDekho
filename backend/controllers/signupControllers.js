import Signup from "../models/signup.js";
import bcrypt from "bcrypt";

// 🆕 NEW: JWT token generate karne ke liye
import jwt from "jsonwebtoken";

// ==========================================
// SIGNUP USER
// ==========================================
export const SignupUser = async (req, res) => {
  try {
    // ------------------------------------------
    // 1. Get data from request body
    // ------------------------------------------
    const { name, email, phone, age, password } = req.body;

    // ------------------------------------------
    // 2. Validate required fields
    // ------------------------------------------
    // ❌ Tumhare code mein ye validation missing tha
    if (!name || !email || !phone || !age || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ------------------------------------------
    // 3. Clean / normalize data
    // ------------------------------------------
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    // ------------------------------------------
    // 4. Basic email validation
    // ------------------------------------------
    // ❌ Tumhare code mein email validation missing tha
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // ------------------------------------------
    // 5. Password validation
    // ------------------------------------------
    // ❌ Tumhare code mein password validation missing tha
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // ------------------------------------------
    // 6. Age validation
    // ------------------------------------------
    const numericAge = Number(age);

    if (numericAge < 1 || numericAge > 120) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid age",
      });
    }

    // ------------------------------------------
    // 7. Check if email or phone already exists
    // ------------------------------------------

    // ❌ Tumhare code mein:
    //
    // findOne({
    //   email,
    //   phone,
    //   age,
    //   password
    // })
    //
    // ye galat approach hai.
    //
    // Hume email OR phone se existing account check karna hai.

    const existingUser = await Signup.findOne({
      $or: [
        { email: cleanEmail },
        { phone: cleanPhone },
      ],
    });

    if (existingUser) {
      // ------------------------------------------
      // 8. Tell user what is already registered
      // ------------------------------------------

      if (existingUser.email === cleanEmail) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
      }

      if (existingUser.phone === cleanPhone) {
        return res.status(409).json({
          success: false,
          message: "Phone number is already registered",
        });
      }
    }

    // ------------------------------------------
    // 9. Hash password
    // ------------------------------------------

    // ❌ Tumhare code mein password directly database
    // mein save ho raha tha.
    //
    // Example:
    // password: "123456"
    //
    // Ye security risk hai.
    //
    // bcrypt password ko hash karega.

    const hashedPassword = await bcrypt.hash(password, 12);

    // ------------------------------------------
    // 10. Create new user
    // ------------------------------------------

    const newUser = new Signup({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      age: numericAge,

      // ✅ Hashed password save hoga
      password: hashedPassword,
    });

    // ------------------------------------------
    // 11. Save user to MongoDB
    // ------------------------------------------

    await newUser.save();

    // 🆕 NEW:
    // Signup ke turant baad user ko authenticated
    // karne ke liye JWT token generate kar rahe hain.
    //
    // authMiddleware decoded.userId ko use karta hai,
    // isliye token ke andar userId hi bhejna hai.
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ------------------------------------------
    // 12. Send success response
    // ------------------------------------------

    // ❌ Password response mein kabhi return nahi karna

    return res.status(201).json({
      success: true,
      message: "Account created successfully",

      // 🆕 NEW:
      // Frontend is token ko save karega aur
      // user ko dobara login nahi karna padega.
      accessToken: token,

      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        age: newUser.age,
      },
    });
  } catch (err) {
    // ------------------------------------------
    // 13. Error handling
    // ------------------------------------------

    console.error("Error during signup:", err);

    // ------------------------------------------
    // MongoDB duplicate key error
    // ------------------------------------------

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or phone number already exists",
      });
    }

    // ------------------------------------------
    // 14. Server error
    // ------------------------------------------

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};