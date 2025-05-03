import axios from "axios";

const orderAPI = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getAllOrders = async () => {
  try {
    const res = await orderAPI.get("/order");
    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy danh sách đơn hàng:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const res = await orderAPI.put(`/order/status/${orderId}`, {
      status: newStatus,
    });
    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi cập nhật trạng thái đơn hàng:",
      error.response?.data || error.message
    );
    throw error;
  }
};
