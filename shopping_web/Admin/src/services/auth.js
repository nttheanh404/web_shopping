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

export const getAllAccounts = () => {
  return api.get("/auth/accounts");
};

export const updateAccount = (id, updateData) => {
  return api.put(`/auth/update/${id}`, updateData);
};
