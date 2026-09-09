const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { verifyToken, generateToken } = require("../middleware/auth");

// POST /api/admin/login
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required." });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }
    const token = generateToken({ role: "admin", restaurant: "whitesmoke" });
    res.json({ success: true, token, message: "Login successful." });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Login failed." });
  }
});

// GET /api/admin/stats
router.get("/stats", verifyToken, async (req, res) => {
  try {
    const [totalOrders, pendingOrders, reviews, pendingReviews, revenueData] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "Pending" } }),
      prisma.review.count(),
      prisma.review.count({ where: { approved: false } }),
      prisma.order.aggregate({ _sum: { total: true } }),
    ]);
    res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        totalRevenue: revenueData._sum.total || 0,
        totalReviews: reviews,
        pendingReviews,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch stats." });
  }
});

// GET /api/admin/orders
router.get("/orders", verifyToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders." });
  }
});

// PUT /api/admin/orders/:id
router.put("/orders/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["Pending", "Confirmed", "Preparing", "Ready", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json({ success: true, order, message: "Order status updated." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update order." });
  }
});

// GET /api/admin/reviews
router.get("/reviews", verifyToken, async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch reviews." });
  }
});

// PUT /api/admin/reviews/:id
router.put("/reviews/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    const review = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { approved: Boolean(approved) },
    });
    res.json({ success: true, review, message: `Review ${approved ? "approved" : "unapproved"}.` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update review." });
  }
});

// DELETE /api/admin/reviews/:id
router.delete("/reviews/:id", verifyToken, async (req, res) => {
  try {
    await prisma.review.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true, message: "Review deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete review." });
  }
});

// GET /api/admin/menu
router.get("/menu", verifyToken, async (req, res) => {
  try {
    const items = await prisma.menuItem.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch menu." });
  }
});

// POST /api/admin/menu
router.post("/menu", verifyToken, async (req, res) => {
  try {
    const { category, name, price, available } = req.body;
    if (!category || !name || !price) {
      return res.status(400).json({ success: false, message: "Category, name, and price are required." });
    }
    const item = await prisma.menuItem.create({
      data: { category, name, price, available: available !== false },
    });
    res.status(201).json({ success: true, item, message: "Menu item added." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add menu item." });
  }
});

// PUT /api/admin/menu/:id
router.put("/menu/:id", verifyToken, async (req, res) => {
  try {
    const { category, name, price, available } = req.body;
    const item = await prisma.menuItem.update({
      where: { id: parseInt(req.params.id) },
      data: { category, name, price, available },
    });
    res.json({ success: true, item, message: "Menu item updated." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update menu item." });
  }
});

// DELETE /api/admin/menu/:id
router.delete("/menu/:id", verifyToken, async (req, res) => {
  try {
    await prisma.menuItem.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true, message: "Menu item deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete menu item." });
  }
});

module.exports = router;
