import React, { useState } from "react";
import {login} from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';
import SignupForm from "../SignupFormModal/SignupForm";

function LoginForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const [showSignup, setShowSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data)
    }
  }
  
  const signUpHandler = (e) => {
    setShowSignup(true)
  }

  return (
    <div>
    {showSignup ? <SignupForm /> :
    <form onSubmit={handleSubmit} className="LoginForm-Container">
      <div className="LoginForm-Header">
        <div className="LoginForm-Title">Sign In</div>
        <button type="submit" className="LoginForm-register-button" onClick={() => signUpHandler()}>Register</button>
      </div>
      <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="LoginForm-label">
        Email
        <input
          className="LoginForm-Input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="LoginForm-label">
        Password 
        <input
          className="LoginForm-Input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="login-submit-button">Sign In</button>
      <button type="submit" className="login-demouser-button" onClick={(e) => {
        setEmail("demo@aa.io");
        setPassword('password')
      }}
        >
        Demo User
      </button>
    </form>
    }
    </div>
  );
}

export default LoginForm;