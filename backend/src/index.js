import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Simple path resolution for production
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? process.env.FRONTEND_URL || "https://your-app-name.onrender.com"
      : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build
  const frontendDistPath = path.join(__dirname, "frontend/dist");
  app.use(express.static(frontendDistPath));

  // Catch-all handler: send back React's index.html file for any non-API routes
  app.get("*", (req, res) => {
    try {
      res.sendFile(path.join(frontendDistPath, "index.html"));
    } catch (error) {
      console.error("Error serving frontend:", error);
      res.status(500).send("Server Error");
    }
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});