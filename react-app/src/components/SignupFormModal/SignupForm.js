import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password === confirmPassword) {
    const data = await dispatch(sessionActions.signUp(username, email, password, firstName, lastName))
        if (data) {
          setErrors(data);
      }
    } else {
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

 
  return (
    <form onSubmit={handleSubmit} className="SignupForm-Container">
      <div className="SignupForm-Header">
        <div className="SignupForm-Title">Create your account</div>
        <div className="SignupForm-Title2">Registration is easy.</div>
      </div>
      <ul>
        <div className="errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </div>
      </ul>
      <label className="SignupForm-label">
        Email address
        <input
          className="SignupForm-Input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="SignupForm-label">
        Username
        <input
          className="SignupForm-Input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="SignupForm-label">
        Password
        <input
          className="SignupForm-Input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="SignupForm-label">
        Confirm password
        <input
          className="SignupForm-Input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          // required
        />
      </label>
      <label className="SignupForm-label">
        First name
        <input
          className="SignupForm-Input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label className="SignupForm-label">
        Last name
        <input
          className="SignupForm-Input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <button type="submit" className="register-button">Register</button>
    </form>
  );
}

export default SignupForm;