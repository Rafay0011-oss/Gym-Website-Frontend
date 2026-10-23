import express from "express";
import validator from "validator";
import { getDB, formatFirebaseError } from "../config/db.js";

const router = express.Router();

// POST /api/contact — Submit a contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

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

    if (!subject || subject.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Subject is required.",
      });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters.",
      });
    }

    const db = getDB();

    await db.collection("contacts").add({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      isRead: false,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      success: false,
      message: formatFirebaseError(error),
    });
  }
});

export default router;
