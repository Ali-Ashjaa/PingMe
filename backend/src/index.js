import express from "express"
import authRoute from "./routes/authRoute.js"
import messageRoute from "./routes/messageRoute.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import { app, server } from "./lib/socket.js"
import path from "path"



dotenv.config()
// const app = express();



app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true               // allow cookies/auth headers
}));




app.use("/api/auth", authRoute)
app.use("/api/message", messageRoute)

const PORT = process.env.PORT
const __dirname = path.resolve()


if (process.env.NODE_ENV === "production") {
  app.use(express.static.path.join(__dirname, "../frontend/dist"))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

server.listen(PORT, () => {
  console.log("server is running on port " + PORT)
})

connectDB()