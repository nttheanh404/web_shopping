import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import AdminLogin from "./Components/Login/AdminLogin";
import RequireAdminAuth from "./Components/Login/RequireAdminAuth";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Route khi truy cập vào trang web sẽ tự động điều hướng đến trang đăng nhập */}
        <Route path="/" element={<Navigate to="/admin-login" />} />

        {/* Route trang đăng nhập admin */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Route admin có bảo vệ đăng nhập */}
        <Route
          path="/admin/*"
          element={
            <RequireAdminAuth>
              <Admin />
            </RequireAdminAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
