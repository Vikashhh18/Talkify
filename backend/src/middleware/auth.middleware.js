import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectRouteMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // ❌ No token
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ❌ Invalid token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ❌ User not found
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Success
    req.user = user;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
