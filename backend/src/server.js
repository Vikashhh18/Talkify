import express from "express";
import "dotenv/config";
import authRouter from "./Routes/auth.route.js";
import messageRouter from "./Routes/message.route.js";
import path from "path";
import dbConnection from "./utils/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./utils/socket.js";

const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true
}));

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// ✅ SERVE FRONTEND
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  dbConnection();
});
