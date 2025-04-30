import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import OrderManagement from "../../Components/OrderManagement/OrderManagement";
import ChatWidget from "../../Components/ChatWidget/ChatWidget";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/updateproduct/:id" element={<AddProduct />} />
        {/* <Route path="/revenue" element={<Revenue />} /> */}
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path="/chatbox" element={<ChatWidget />} />
      </Routes>
    </div>
  );
};

export default Admin;
