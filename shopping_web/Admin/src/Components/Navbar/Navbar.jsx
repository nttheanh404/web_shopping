import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/logo.png";
// import navProfile from "../../assets/nav-profile.svg";

function Navbar() {
  // const isAdminLoggedIn = localStorage.getItem("adminToken");

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={navlogo} alt="logo" className="navbar-logo" />
        <div className="navbar-title">
          <h1>JYSTORE</h1>
          <p>Admin Panel</p>
        </div>
      </div>
      {/* {isAdminLoggedIn && (
        <img src={navProfile} alt="nav profile" className="navbar-profile" />
      )} */}
    </div>
  );
}

export default Navbar;
