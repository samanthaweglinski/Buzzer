import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp, demoLogin } from "../../store/session";
import "../CSS/SplashPage.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, profile_pic, bio, password));
      if (data) {
        setErrors(data);
      }
    } else setErrors(['Password does not match'])
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfilePic = (e) => {
    setProfilePic(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const goToLogin = (e) => {
    history.push("/login");
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Profile Pic URL</label>
          <input
            type="text"
            name="profile_pic"
            onChange={updateProfilePic}
            value={profile_pic}
          ></input>
        </div>
        <div>
          <label>Bio</label>
          <input
            type="text"
            name="bio"
            onChange={updateBio}
            value={bio}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            // required={true}
          ></input>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <button
        className="demo-login-btn"
        type="button"
        onClick={() => {
          dispatch(demoLogin());
        }}
      >
        Demo Login
      </button>
    </>
  );
};

export default SignUpForm;
