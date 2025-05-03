import axios from "axios";

// Cấu hình axios
const api = axios.create({
  baseURL: "http://localhost:8080", // Thay đổi nếu cần thiết
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginAdmin = (email, password) => {
  return api.post("/auth/login", { email, password });
};
