const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Generate unique order number like WS-0001
const generateOrderNumber = async () => {
  const count = await prisma.order.count();
  const num = String(count + 1).padStart(4, "0");
  return `WS-${num}`;
};

// POST /api/orders - Place a new order
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, address, items, total, notes } = req.body;

    if (!customerName || !phone || !address || !items || !total) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const orderNumber = await generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        phone,
        address,
        items,
        total: parseFloat(total),
        notes: notes || null,
        status: "Pending",
      },
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderNumber: order.orderNumber,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Failed to place order. Please try again." });
  }
});

// GET /api/orders/:orderNumber - Track order by order number
router.get("/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findUnique({
      where: { orderNumber: orderNumber.toUpperCase() },
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found. Please check the order number." });
    }

    res.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        items: order.items,
        total: order.total,
        status: order.status,
        address: order.address,
        notes: order.notes,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Error tracking order:", error);
    res.status(500).json({ success: false, message: "Failed to fetch order." });
  }
});

module.exports = router;
