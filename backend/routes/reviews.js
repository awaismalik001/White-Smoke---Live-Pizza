const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/reviews - Get all approved reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Failed to fetch reviews." });
  }
});

// POST /api/reviews - Submit a new review
router.post("/", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ success: false, message: "Name, rating, and comment are required." });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
    }

    await prisma.review.create({
      data: {
        name,
        rating: parseInt(rating),
        comment,
        approved: false,
      },
    });

    res.status(201).json({
      success: true,
      message: "Thank you for your review! It will be published after approval.",
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ success: false, message: "Failed to submit review." });
  }
});

module.exports = router;
