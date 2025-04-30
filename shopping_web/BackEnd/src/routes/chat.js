// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/ChatController");

router.get("/chat/:userId", chatController.getChatHistory);
router.post("/chat/send", chatController.sendMessage);
router.get("/chatbox/users", chatController.getAllChatUsers);

module.exports = router;
