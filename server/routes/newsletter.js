import express from "express";
import validator from "validator";
import { getDB, formatFirebaseError } from "../config/db.js";

const router = express.Router();

// POST /api/newsletter/subscribe — Subscribe to newsletter
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const db = getDB();
    const normalizedEmail = email.toLowerCase().trim();

    // Check if already subscribed
    const existingSnapshot = await db
      .collection("newsletters")
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (!existingSnapshot.empty) {
      const existingDoc = existingSnapshot.docs[0];
      const existingData = existingDoc.data();

      if (existingData.isActive) {
        return res.status(400).json({
          success: false,
          message: "This email is already subscribed to our newsletter.",
        });
      }

      // Reactivate if previously unsubscribed
      await db
        .collection("newsletters")
        .doc(existingDoc.id)
        .update({ isActive: true });

      return res.status(200).json({
        success: true,
        message:
          "Welcome back! Your newsletter subscription has been reactivated.",
      });
    }

    await db.collection("newsletters").add({
      email: normalizedEmail,
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to our newsletter!",
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(500).json({
      success: false,
      message: formatFirebaseError(error),
    });
  }
});

export default router;
