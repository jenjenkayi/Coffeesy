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

    if(!email) return setErrors(['Please provide an email'])
    if(!email.includes('@')) return setErrors(['Please provide a valid email'])
    if (!username) return setErrors(['Please provide a username.'])
    if (!password)return setErrors(['Please provide a password.'])
    if (confirmPassword !== password)return setErrors(["Please provide a confirm password and it must be the same as the password field."])
    if (!firstName)return setErrors(['Please provide a first name.'])
    if (!lastName)return setErrors(['Please provide a last name.'])

    if (password === confirmPassword) {
    setErrors([]);
    return await dispatch(sessionActions.signUp(username, email, password, firstName, lastName))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
      return setErrors(['Confirm Password field must be the same as the Password field']);
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