require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Hosted deployments use one reverse proxy, so rate limiting can see the
// visitor's IP address rather than the proxy address.
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "http://localhost:5173",
    "http://localhost:3000",
    /\.netlify\.app$/,
  ],
  credentials: true,
}));
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/orders", require("./routes/orders"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/admin", require("./routes/admin"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", restaurant: "White Smoke Live Pizza", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ─── Seed Menu ───────────────────────────────────────────────
const seedMenuItems = async () => {
  const count = await prisma.menuItem.count();
  if (count > 0) return;

  console.log("🌱 Seeding menu items...");

  const menuData = [
    // Pizza Regular
    { category: "Pizza (Regular)", name: "Chicken Tikka Pizza", price: "S:500 / M:1050 / L:1600 / XL:2050" },
    { category: "Pizza (Regular)", name: "Chicken Fajita Pizza", price: "S:500 / M:1050 / L:1600 / XL:2050" },
    { category: "Pizza (Regular)", name: "Malai Boti Pizza", price: "S:500 / M:1050 / L:1600 / XL:2050" },
    { category: "Pizza (Regular)", name: "Behari Kabab Pizza", price: "S:500 / M:1050 / L:1600 / XL:2050" },
    { category: "Pizza (Regular)", name: "White Smoke Special Pizza", price: "S:500 / M:1050 / L:1600 / XL:2050" },
    // Pizza Special
    { category: "Pizza (Special)", name: "Crown Crust Pizza", price: "S:800 / M:1500 / L:2000 / XL:2500" },
    { category: "Pizza (Special)", name: "Kabab Stuffer Pizza", price: "S:800 / M:1500 / L:2000 / XL:2500" },
    { category: "Pizza (Special)", name: "Chesse Stuffer Pizza", price: "S:800 / M:1500 / L:2000 / XL:2500" },
    { category: "Pizza (Special)", name: "Half & Half Pizza", price: "S:800 / M:1500 / L:2000 / XL:2500" },
    // Burgers
    { category: "Burgers", name: "Chicken Burger", price: "250" },
    { category: "Burgers", name: "Crunch Burger", price: "300" },
    { category: "Burgers", name: "Petty Burger", price: "350" },
    { category: "Burgers", name: "Zinger Burger", price: "450" },
    { category: "Burgers", name: "Tower Burger", price: "550" },
    // Rolls
    { category: "Rolls", name: "Chicken Shawarma", price: "220" },
    { category: "Rolls", name: "Special Shawarma", price: "250" },
    { category: "Rolls", name: "Zinger Shawarma", price: "350" },
    { category: "Rolls", name: "Jumbo Shawarma", price: "400" },
    { category: "Rolls", name: "Chicken Paratha Roll", price: "400" },
    { category: "Rolls", name: "Zinger Paratha Roll", price: "400" },
    { category: "Rolls", name: "Kabab Shawarma", price: "250" },
    { category: "Rolls", name: "Kabab Paratha Roll", price: "350" },
    { category: "Rolls", name: "Spin Roll (4 Pcs)", price: "550" },
    { category: "Rolls", name: "Malai Boti Spin Roll (4 Pcs)", price: "600" },
    { category: "Rolls", name: "Tortilla Wrap", price: "500" },
    { category: "Rolls", name: "Tortilla Wrap Malai Boti", price: "600" },
    // Appetizer
    { category: "Appetizer", name: "Regular Fries", price: "200" },
    { category: "Appetizer", name: "Jumbo Fries", price: "350" },
    { category: "Appetizer", name: "Loaded Fries (Small)", price: "450" },
    { category: "Appetizer", name: "Loaded Fries (Large)", price: "650" },
    { category: "Appetizer", name: "Oven Bake Wings (5 Pcs)", price: "400" },
    { category: "Appetizer", name: "Oven Bake Wings (10 Pcs)", price: "800" },
    { category: "Appetizer", name: "Hot Wings (10 Pcs)", price: "800" },
    { category: "Appetizer", name: "Hot Shots (10 Pcs)", price: "800" },
    { category: "Appetizer", name: "Nuggets (5 Pcs)", price: "400" },
    { category: "Appetizer", name: "Nuggets (10 Pcs)", price: "800" },
    // Pasta
    { category: "Pasta", name: "Special Pasta (Small)", price: "450" },
    { category: "Pasta", name: "Special Pasta (Large)", price: "750" },
    // Donor & Sandwich
    { category: "Donor & Sandwich", name: "Regular Donor", price: "500" },
    { category: "Donor & Sandwich", name: "Special Donor", price: "600" },
    { category: "Donor & Sandwich", name: "Special Sandwich", price: "600" },
    // Platter
    { category: "Platter", name: "White Smoke Platter (Spin Roll 4Pcs + Wings 5Pcs + Reg Fries + Dip)", price: "1100" },
    // Beverages
    { category: "Beverages", name: "Cold Drink 300ml", price: "80" },
    { category: "Beverages", name: "Cold Drink 345ml", price: "100" },
    { category: "Beverages", name: "Cold Drink 500ml", price: "120" },
    { category: "Beverages", name: "1 Ltr Drink", price: "200" },
    { category: "Beverages", name: "1.5 Ltr Drink", price: "220" },
  ];

  await prisma.menuItem.createMany({ data: menuData });
  console.log(`✅ Seeded ${menuData.length} menu items.`);
};

// ─── Start Server ─────────────────────────────────────────────
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL database.");
    await seedMenuItems();
    app.listen(PORT, () => {
      console.log(`🚀 White Smoke API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Server shut down gracefully.");
  process.exit(0);
});
