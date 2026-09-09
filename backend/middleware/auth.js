const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.adminId || decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Invalid administrator session." });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: { tokenVersion: true },
    });
    if (!admin || admin.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({ success: false, message: "Your session has expired. Please sign in again." });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
};

module.exports = { verifyToken, generateToken };
