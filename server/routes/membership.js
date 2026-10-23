import express from "express";
import { getDB, formatFirebaseError } from "../config/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST /api/membership/subscribe — Subscribe to a membership plan
router.post("/subscribe", auth, async (req, res) => {
  try {
    const { plan } = req.body;

    const validPlans = ["basic", "premium", "bundle"];
    if (!plan || !validPlans.includes(plan)) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a valid membership plan (basic, premium, or bundle).",
      });
    }

    if (req.user.membership === plan) {
      return res.status(400).json({
        success: false,
        message: `You are already subscribed to the ${plan} plan.`,
      });
    }

    const db = getDB();
    const membershipStartDate = new Date().toISOString();

    await db.collection("users").doc(req.user.id).update({
      membership: plan,
      membershipStartDate,
    });

    res.status(200).json({
      success: true,
      message: `Successfully subscribed to the ${plan} plan!`,
      membership: {
        plan,
        startDate: membershipStartDate,
      },
    });
  } catch (error) {
    console.error("Membership error:", error);
    res.status(500).json({
      success: false,
      message: formatFirebaseError(error),
    });
  }
});

// GET /api/membership/status — Get current membership status
router.get("/status", auth, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      membership: {
        plan: req.user.membership,
        startDate: req.user.membershipStartDate,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch membership status.",
    });
  }
});

export default router;
