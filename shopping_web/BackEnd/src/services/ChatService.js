// services/chatService.js
const Message = require("../models/message");
const mongoose = require("mongoose");

const saveMessage = async ({ senderId, receiverId, content, isAdmin }) => {
  const message = new Message({ senderId, receiverId, content, isAdmin });
  return await message.save();
};

const getMessagesByUserId = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  return await Message.find({
    $or: [{ senderId: objectId }, { receiverId: objectId }],
  }).sort({ createdAt: 1 });
};

const getMessagesBySenderAndReceiver = async (senderId, receiverId) => {
  const senderObj = new mongoose.Types.ObjectId(senderId);
  const receiverObj = new mongoose.Types.ObjectId(receiverId);

  return await Message.find({
    $or: [
      { senderId: senderObj, receiverId: receiverObj },
      { senderId: receiverObj, receiverId: senderObj },
    ],
  }).sort({ createdAt: 1 });
};

const getAllChatUsers = async (adminId) => {
  const adminObjectId = new mongoose.Types.ObjectId(adminId);
  console.log("Admin ID:", adminObjectId);

  // Lấy tất cả các user đã từng gửi hoặc nhận với admin
  const messages = await Message.find({
    $or: [{ senderId: adminObjectId }, { receiverId: adminObjectId }],
  });
  console.log(messages);

  const userSet = new Set();

  messages.forEach((msg) => {
    const { senderId, receiverId } = msg;

    if (senderId.toString() !== adminId) {
      userSet.add(senderId.toString());
    }
    if (receiverId.toString() !== adminId) {
      userSet.add(receiverId.toString());
    }
  });

  return Array.from(userSet);
};

module.exports = {
  saveMessage,
  getMessagesByUserId,
  getMessagesBySenderAndReceiver,
  getAllChatUsers,
};
