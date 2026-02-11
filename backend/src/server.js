import express from "express";
import "dotenv/config";
import authRouter from "./Routes/auth.route.js";
import messageRouter from "./Routes/message.route.js";
import path from "path";
import dbConnection from "./utils/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { app, server } from "./utils/socket.js";

// const app = express();
const __dirname = path.resolve();

console.log("CORS origin:", process.env.CLIENT_URL);

// middleware that use to get req.body with json format 
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// app.options("*", cors());
app.use(cookieParser());

// apies 

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // ✅ FIXED wildcard
  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}
const port = process.env.PORT || 3002;

server.listen(port, () => {
  console.log(` Server running on port ${port}`);
  dbConnection();
});
