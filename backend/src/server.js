import "dotenv/config";
import express from "express";
import authRouter from "./Routes/auth.route.js";
import messageRouter from "./Routes/message.route.js";
import dbConnection from "./utils/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { app, server } from "./utils/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use(cors({
  origin: true,
  credentials: true
}));

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// ✅ Serve frontend (Express 5 safe)
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

server.listen(PORT, async () => {
  console.log("🚀 Server running on port:", PORT);
  await dbConnection();
});
