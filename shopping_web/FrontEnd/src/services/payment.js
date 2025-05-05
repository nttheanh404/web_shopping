import axios from "axios";
const authUrl = import.meta.env.VITE_BE_URL || "http://localhost:8080";

const paymentAPI = axios.create({
  baseURL: authUrl + "/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "true",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export const createPaymentRequest = async (data) => {
  try {
    const response = await paymentAPI.post("/create_payment_url", data);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
};
