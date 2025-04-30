import React, { useEffect, useState } from "react";
import {
  getAllChatUsers,
  getChatHistory,
  sendMessage,
} from "../../services/chat"; // sửa path tùy dự án
import "./ChatWidget.css";

const ChatWidget = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Lấy danh sách user từng nhắn
  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const users = await getAllChatUsers();
        setChatUsers(users);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
      }
    };

    fetchChatUsers();
  }, []);

  // Lấy lịch sử chat khi chọn user
  useEffect(() => {
    if (selectedUser) {
      const fetchChatHistory = async () => {
        try {
          const history = await getChatHistory(selectedUser);

          setChatHistory(history);
        } catch (err) {
          console.error("Lỗi khi lấy lịch sử chat:", err);
        }
      };
      fetchChatHistory();
    }
  }, [selectedUser]);
  console.log(localStorage.getItem("userId"));
  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      await sendMessage({
        senderId: localStorage.getItem("userId"),
        receiverId: selectedUser,
        content: newMessage,
        isAdmin: true,
      });
      setNewMessage("");
      const updatedHistory = await getChatHistory(selectedUser);
      setChatHistory(updatedHistory);
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
    }
  };

  return (
    <div className="chat-widget-container">
      <div className="chat-users-list">
        <h3>Khách hàng</h3>
        {chatUsers.length === 0 ? (
          <p>Chưa có khách hàng nào nhắn.</p>
        ) : (
          chatUsers.map((user) => (
            <div
              key={user._id}
              className={`chat-user-box ${
                selectedUser?._id === user._id ? "selected" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <span>{user.name || user.email || "Người dùng ẩn danh"}</span>
            </div>
          ))
        )}
      </div>

      <div className="chat-box">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h4>Chat với: {selectedUser.name || selectedUser.email}</h4>
            </div>
            <div className="chat-messages">
              {chatHistory.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat-message ${msg.isAdmin ? "admin" : "user"}`}
                >
                  <span>{msg.content}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSend}>Gửi</button>
            </div>
          </>
        ) : (
          <p className="chat-placeholder">
            Chọn một khách hàng để bắt đầu chat.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
