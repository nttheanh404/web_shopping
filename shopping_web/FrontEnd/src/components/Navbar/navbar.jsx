import React, { useContext } from "react";
import "./navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  // const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
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
          <img src={logo} alt="logo" style={{ width: "15%" }} />
          <p>JYSTORE</p>
        </Link>
      </div>

      <ul className="nav-menu">
        {/* <li onClick={() => setMenu("shop")}> */}
        <li>
          <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to="/"
          >
            Shop
          </Link>
          {/* {menu === "shop" ? <hr /> : null} */}
        </li>
        {/* <li onClick={() => setMenu("mens")}> */}
        <li>
          <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to="/mens"
          >
            Men
          </Link>
          {/* {menu === "mens" ? <hr /> : null} */}
        </li>
        {/* <li onClick={() => setMenu("womens")}> */}
        <li>
          <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to="/womens"
          >
            Women
          </Link>
          {/* {menu === "womens" ? <hr /> : null} */}
        </li>
        {/* <li onClick={() => setMenu("kids")}> */}
        <li>
          <Link
            style={{ textDecoration: "none", color: "currentColor" }}
            to="/kids"
          >
            Kids
          </Link>
          {/* {menu === "kids" ? <hr /> : null} */}
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
          <img src={cart_icon} alt="cart icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
