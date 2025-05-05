import axios from "axios";

const authUrl = import.meta.env.VITE_BE_URL || "http://localhost:8080";
const chatAPI = axios.create({
  baseURL: authUrl + "/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const sendMessage = async ({ receiverId, content, isAdmin }) => {
  try {
    const admin = JSON.parse(localStorage.getItem("adminInfo"));
    const senderId = admin?.id;
    console.log("Sender ID:", senderId);

    const res = await chatAPI.post("/chat/send", {
      senderId,
      receiverId,
      content,
      isAdmin,
    });

    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi gửi tin nhắn:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getChatHistory = async (userId) => {
  try {
    const res = await chatAPI.get(`/chat/${userId}`);
    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy lịch sử chat:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllChatUsers = async () => {
  try {
    const res = await chatAPI.get("/chatbox/users");
    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy danh sách người đã nhắn tin:",
      error.response?.data || error.message
    );
    throw error;
  }
};
