import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import { getUserForSidebar } from "../controllers/messageController.js"
import { getMessages, sendMessage } from "../controllers/messageController.js"
const router = express.Router()

console.log("📝 Message routes file loaded");
console.log("📝 getUserForSidebar imported:", typeof getUserForSidebar);

router.get("/users", protectRoute, getUserForSidebar)  
router.get("/:id", protectRoute, getMessages)         
router.post("/send/:id", protectRoute, sendMessage)

export default router;