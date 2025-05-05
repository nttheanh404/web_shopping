import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/admin/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item" style={{ paddingLeft: "20px" }}>
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/admin/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item" style={{ paddingLeft: "20px" }}>
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to={"/admin/ordermanagement"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p className="sidebar-item-text">
            <span className="icon-management">🧾 </span> Order Management
          </p>
        </div>
      </Link>
      <Link to={"/admin/revenue"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p className="sidebar-item-text">
            <span className="icon-management">📊</span> Revenue Statistics
          </p>
        </div>
      </Link>
      <Link to={"/admin/chatbox"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p className="sidebar-item-text">
            <span className="icon-management">💬</span> Respond customers
          </p>
        </div>
      </Link>
      <Link to={"/admin/accountmanagement"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p className="sidebar-item-text">
            <span className="icon-management">🧑‍💼 </span> Account Management
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
