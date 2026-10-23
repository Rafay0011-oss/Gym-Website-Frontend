import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import { getDB, formatFirebaseError } from "../config/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate inputs
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters.",
      });
    }

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const db = getDB();
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUsers = await db
      .collection("users")
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (!existingUsers.empty) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user document
    const userRef = await db.collection("users").add({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone?.trim() || "",
      membership: "none",
      membershipStartDate: null,
      createdAt: new Date().toISOString(),
    });

    // Generate token
    const token = generateToken(userRef.id);

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: {
        id: userRef.id,
        name: name.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || "",
        membership: "none",
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: formatFirebaseError(error),
    });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    const db = getDB();
    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email
    const usersSnapshot = await db
      .collection("users")
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (usersSnapshot.empty) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data();

    // Check password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate token
    const token = generateToken(userDoc.id);

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: userDoc.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        membership: userData.membership,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: formatFirebaseError(error),
    });
  }
});

// GET /api/auth/me — Get current user profile
router.get("/me", auth, async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      membership: req.user.membership,
      membershipStartDate: req.user.membershipStartDate,
      createdAt: req.user.createdAt,
    },
  });
});

export default router;
