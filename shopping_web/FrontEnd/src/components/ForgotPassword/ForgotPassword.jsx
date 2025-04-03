import React, { useState } from 'react'
import "./ForgotPassword.css"

const ForgotPassword = () => {

    const [focusedInput, setFocusedInput] = useState(null);
    
      const getInputClassName = (inputName) => {
        return `input-field ${window.innerWidth >= 768 ? "md" : ""} ${
          focusedInput === inputName ? "focused" : ""
        }`;
      };

  return (
    <div className='forgot-password'>
        <h1>Forgot Your PassWord?</h1>
        <p>Please enter your email below to receive a password reset a link.</p>
        <div className="forgot-password-input">
            <input 
                type="text" 
                placeholder='Your Address'
                name='email'
                className={getInputClassName("email")}
                onFocus={()=>setFocusedInput("email")}
                onBlur={()=>setFocusedInput(null)}
            />
        </div>
        <button className='forgot-password-btn'>Reset my password</button>
    </div>
  )
}

export default ForgotPassword