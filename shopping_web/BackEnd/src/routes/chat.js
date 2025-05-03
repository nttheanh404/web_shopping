// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/ChatController");
const verifyToken = require("../middleware/verifyToken");

router.get("/chat/:userId", verifyToken, chatController.getChatHistory);
router.post("/chat/send", verifyToken, chatController.sendMessage);
router.get("/chatbox/users", verifyToken, chatController.getAllChatUsers);

module.exports = router;
