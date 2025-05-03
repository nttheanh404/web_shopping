// controllers/chatController.js
const chatService = require("../services/ChatService");

const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await chatService.getMessagesByUserId(userId);

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy lịch sử chat", error: err });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content, isAdmin } = req.body;

    // Kiểm tra các tham số có hợp lệ không
    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết." });
    }
    const message = await chatService.saveMessage({
      senderId,
      receiverId,
      content,
      isAdmin,
    });

    if (req.io) {
      req.io.to(receiverId).emit("newMessage", message);
    }

    res.status(201).json(message);
  } catch (err) {
    console.error("Lỗi khi gửi tin nhắn:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi gửi tin nhắn", error: err.message });
  }
};

const ADMIN_ID = "6811c3de413dab1c1a26e3ed";

const getAllChatUsers = async (req, res) => {
  try {
    const users = await chatService.getAllChatUsers(ADMIN_ID);
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách người chat", error: err });
  }
};

module.exports = {
  getChatHistory,
  sendMessage,
  getAllChatUsers,
};
