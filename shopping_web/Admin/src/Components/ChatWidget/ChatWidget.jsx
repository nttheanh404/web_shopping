import React, { useEffect, useState, useRef } from "react";
import {
  getAllChatUsers,
  getChatHistory,
  sendMessage,
} from "../../services/chat";
import "./ChatWidget.css";
import { io } from "socket.io-client";

const authUrl = import.meta.env.VITE_BE_URL || "http://localhost:8080";
const socket = io(authUrl);

const ChatWidget = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [unreadMessages, setUnreadMessages] = useState({});
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  useEffect(() => {
    socket.connect();

    // Lắng nghe tin nhắn đến
    const admin = JSON.parse(localStorage.getItem("adminInfo"));
    socket.emit("join", admin?.id);
    socket.on("newMessage", (message) => {
      if (selectedUser && message.senderId === selectedUser) {
        setChatHistory((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedUser]);

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
      console.log("Selected user:", selectedUser);
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

  const admin = JSON.parse(localStorage.getItem("adminInfo"));

  // const handleSend = async () => {
  //   if (!newMessage.trim()) return;
  //   try {
  //     await sendMessage({
  //       senderId: admin?.id,
  //       receiverId: selectedUser,
  //       content: newMessage,
  //       isAdmin: true,
  //     });
  //     setNewMessage("");
  //     const updatedHistory = await getChatHistory(selectedUser);
  //     setChatHistory(updatedHistory);
  //   } catch (err) {
  //     console.error("Lỗi khi gửi tin nhắn:", err);
  //   }
  // };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: admin?.id,
      receiverId: selectedUser,
      content: newMessage,
      isAdmin: true,
    };

    try {
      await sendMessage(messageData);
      socket.emit("sendMessage", messageData);
      setChatHistory((prev) => [...prev, { ...messageData, _id: Date.now() }]);
      setNewMessage("");
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
    }
  };

  const handleSelectUser = (user) => {
    console.log("Selected user:", user);
    setSelectedUser(user);
    setUnreadMessages((prev) => ({
      ...prev,
      [user]: false,
    }));
  };

  // const handleNewMessage = (message) => {
  //   if (selectedUser !== message.senderId) {
  //     // Nếu người dùng chưa được chọn, đánh dấu tin nhắn là chưa xem
  //     setUnreadMessages((prev) => ({
  //       ...prev,
  //       [message.senderId]: true,
  //     }));
  //   }

  //   // Cập nhật lịch sử chat
  //   setChatHistory((prevHistory) => [...prevHistory, message]);
  // };

  return (
    <div className="chat-widget-container">
      <div className="chat-users-list">
        <h3>Customer: </h3>
        {chatUsers.length === 0 ? (
          <p>No customers have messaged yet.</p>
        ) : (
          chatUsers.map((user) => (
            <div
              key={user}
              className={`chat-user-box ${
                selectedUser === user ? "selected" : ""
              } ${unreadMessages[user] ? "unread" : ""}`}
              onClick={() => handleSelectUser(user)}
            >
              <span>ID: {user || "Anonymous user"}</span>
            </div>
          ))
        )}
      </div>

      <div className="chat-box">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h4>Chat with: {selectedUser}</h4>
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
              <div ref={chatRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Enter a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <p className="chat-placeholder">
            Select a customer to start chatting.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
