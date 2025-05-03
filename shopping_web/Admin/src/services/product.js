import axios from "axios";

const productAPI = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

// Lấy tất cả sản phẩm chưa bị xóa
export const getAllProducts = async () => {
  try {
    const res = await productAPI.get("/allproducts");
    const activeProducts = res.data.filter((product) => !product.isDeleted);
    return activeProducts;
  } catch (error) {
    console.error(
      "Lỗi khi lấy sản phẩm:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Xóa sản phẩm theo id
export const deleteProduct = async (id) => {
  try {
    const res = await productAPI.delete(`/removeproduct/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi xóa sản phẩm:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Upload ảnh
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await productAPI.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi upload ảnh:", err.response?.data || err.message);
    return { success: false };
  }
};

// Thêm sản phẩm mới
export const createProduct = async (product) => {
  try {
    const res = await productAPI.post("/addproduct", product);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi thêm sản phẩm:", err.response?.data || err.message);
    return { success: false };
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (id, product) => {
  try {
    const res = await productAPI.put(`/updateproduct/${id}`, product);
    return res.data;
  } catch (err) {
    console.error(
      "Lỗi khi cập nhật sản phẩm:",
      err.response?.data || err.message
    );
    return { success: false };
  }
};
