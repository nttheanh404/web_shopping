// socket/socketHandler.js
const chatService = require("../services/ChatService");

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      console.log(`User ${userId} joined room`);
      socket.join(userId);
    });

    socket.on("send_message", async (data) => {
      const { senderId, receiverId, content, isAdmin } = data;

      // Lưu tin nhắn vào DB
      const savedMessage = await chatService.saveMessage({
        senderId,
        receiverId,
        content,
        isAdmin,
      });

      // Gửi đến người nhận
      io.to(receiverId).emit("receive_message", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = setupSocket;
