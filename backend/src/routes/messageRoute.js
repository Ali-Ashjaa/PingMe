import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import { getUserForSidebar } from "../controllers/messageController.js"
import { getMessages, sendMessage } from "../controllers/messageController.js"
const router = express.Router()

router.get("/users", protectRoute, getUserForSidebar)  // Specific route first
router.get("/:id", protectRoute, getMessages)         // Parameterized route second
router.post("/send/:id", protectRoute, sendMessage)

export default router;