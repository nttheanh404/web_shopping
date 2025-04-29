import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import hero1_image from "../components/assets/hero1_image.png";

import { FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const [state,setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",    
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const login=async()=>{
    console.log("Login",formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) =>response.json())
    .then((data) => {
      responseData = data;
    })
    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.message);
    }
  }
  const signup=async()=>{
    console.log("Sign Up",formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) =>response.json())
    .then((data) => {
      responseData = data;
    })
    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.message);
    }
  }
  const getInputClassName = (inputName) => {
    return `input-field ${window.innerWidth >= 768 ? "md" : ""} ${
      focusedInput === inputName ? "focused" : ""
    }`;
  };

  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
          {state==="Sign Up"?<div className="login-signup-name">
            <p>
              Your Name <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              // className={getInputClassName("name")}
              // onFocus={() => setFocusedInput("name")}
              // onBlur={() => setFocusedInput(null)}
            />
          </div>:<></>}
          <div className="login-signup-mail">
            <p>
              Email Address <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              // className={getInputClassName("email")}
              // onFocus={() => setFocusedInput("email")}
              // onBlur={() => setFocusedInput(null)}
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
                name="password"
                value={formData.password}
                onChange={changeHandler}
                // className={getInputClassName("password")}
                // onFocus={() => setFocusedInput("password")}
                // onBlur={() => setFocusedInput(null)}
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
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state === "Sign Up" ? 
        <p className="login-signup-login">
          Already have an account? <span onClick={()=>{setState("Login")}}>Log in here</span>
        </p>:
        <p className="login-signup-login">
          Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span>
        </p>}
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
