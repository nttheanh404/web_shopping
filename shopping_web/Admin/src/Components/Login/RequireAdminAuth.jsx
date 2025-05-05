import React from "react";
import { Navigate } from "react-router-dom";

const RequireAdminAuth = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");

  return token && adminInfo?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/admin-login" replace />
  );
};

export default RequireAdminAuth;
