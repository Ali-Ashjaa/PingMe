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

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production") {
 
  app.use(express.static("../frontend/dist"));


  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../frontend/dist/index.html"));
  });
}
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});