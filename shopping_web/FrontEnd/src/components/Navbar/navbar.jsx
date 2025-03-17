import React from "react";
import "./navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link
          style={{
            textDecoration: "none",
            color: "currentColor",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          to="/"
        >
          {" "}
          <img src={logo} alt="logo" style={{ width: "15%" }} />
          <p>JYSTORE</p>{" "}
        </Link>
      </div>
      <ul className="nav-menu">
        <li>
          <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to="/"
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to="/mens"
          >
            Men
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to="/womens"
          >
            Women
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to="/kids"
          >
            Kid
          </Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link
          style={{ textDecoration: "none", color: "currentColor" }}
          to="/login"
        >
          <button>Log in</button>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "currentColor" }}
          to="/cart"
        >
          <img src={cart_icon} alt="" />
        </Link>

        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
