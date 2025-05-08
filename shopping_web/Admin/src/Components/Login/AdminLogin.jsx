import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { loginAdmin } from "../../services/auth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginAdmin(email, password);

      const { accessToken, user } = res.data;
      console.log(user);

      // Kiểm tra nếu tài khoản admin có trạng thái "active"
      if (user.status !== "active") {
        console.log(user.status);
        return setErrorMsg(
          "Your account is not active yet. Please contact support."
        );
      }

      if (user.role !== "admin") {
        return setErrorMsg("You do not have admin access");
      }

      // Lưu token và thông tin user
      localStorage.setItem("adminToken", accessToken);
      localStorage.setItem("adminInfo", JSON.stringify(user));

      navigate("/admin/addproduct");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2>Login</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
