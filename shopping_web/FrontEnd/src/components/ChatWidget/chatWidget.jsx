import { useEffect, useState, useRef } from "react";
import { getChatHistory, sendMessage } from "../../services/chat";
import { io } from "socket.io-client";
import "./ChatWidget.css";

const socket = io("http://localhost:8080");

const ChatWidget = ({ userId, isAdmin = false }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    if (userId) {
      fetchChat();
      socket.emit("join", userId);
      socket.on("newMessage", (newMsg) => {
        setChat((prev) => [...prev, newMsg]);
      });
    }

    return () => {
      socket.off("newMessage");
    };
  }, [userId]);

  const fetchChat = async () => {
    try {
      const res = await getChatHistory(userId);
      setChat(res);
    } catch (err) {
      console.error("Không lấy được lịch sử chat:", err);
    }
  };

  const ADMIN_ID = "6804c33032d8d3c161c45271";

  const handleSend = async () => {
    if (!message.trim()) return;

    const receiverId = isAdmin ? chat[0]?.senderId || userId : ADMIN_ID;
    const newMsg = {
      senderId: userId,
      receiverId,
      content: message,
      isAdmin,
    };

    try {
      const res = await sendMessage(newMsg);
      setChat((prev) => [...prev, res]);
      setMessage("");
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chat-widget">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="chat-toggle-button"
      >
        {open ? "Đóng chat" : "💬 Chat với Admin"}
      </button>

      {open && (
        <div className="chat-box">
          {/* Header */}
          <div className="chat-header">
            <span>Hỗ trợ trực tuyến</span>
            <button
              onClick={() => setOpen(false)}
              className="chat-close-button"
            >
              ✕
            </button>
          </div>

          {/* Chat content */}
          <div className="chat-content">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message-wrapper ${
                  msg.senderId === userId ? "sent" : "received"
                }`}
              >
                <div className="chat-message">{msg.content}</div>
              </div>
            ))}
            <div ref={chatRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <input
              className="chat-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={handleSend} className="chat-send-button">
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
