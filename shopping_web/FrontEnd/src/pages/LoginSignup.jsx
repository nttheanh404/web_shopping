import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import hero1_image from "../components/assets/hero1_image.png";


import { FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const getInputClassName = (inputName) => {
    return `input-field ${window.innerWidth >= 768 ? "md" : ""} ${
      focusedInput === inputName ? "focused" : ""
    }`;
  };

  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>Sign Up</h1>
        <div className="login-signup-fields">
          <div className="login-signup-name">
            <p>
              Your Name <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              className={getInputClassName("name")}
              onFocus={() => setFocusedInput("name")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <div className="login-signup-mail">
            <p>
              Email Address <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className={getInputClassName("email")}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <div className="login-signup-password">
            <p>
              Password <span style={{ color: "red" }}>*</span>
            </p>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={getInputClassName("password")}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
              <div
                className="login-signup-showPassword"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={27} /> : <FaEye size={25} />}
              </div>
            </div>
          </div>
        </div>
        <button>Continue</button>
        <p className="login-signup-login">
          Already have an account? <span>Log in here</span>
        </p>
        <div className="login-signup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
      <div className="login-signup-image">
        <img src={hero1_image} alt="" />
      </div>
    </div>
  );
};

export default LoginSignup;
