import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import bird from "../components/images/twitter_logo.svg";
import "./CSS/NavBar.css";

const NavBar = () => {
  const user = useSelector((state) => state?.session?.user);

  console.log(user);

  return (
    <nav className="left-nav">
      <div className="nav-icons">
        <div className="bee-img">
          <NavLink to="/" exact={true} activeClassName="active">
            <img className="buzzer-icon" src={bird} alt="" />
          </NavLink>
        </div>
        <div className="linkedin">
          <a href='https://www.linkedin.com/in/samanthaweglinski/'>
          <i class="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
        <div className="github">
          <a href='https://github.com/samanthaweglinski'>
          <i class="fa-brands fa-github"></i>
          </a>
        </div>
        <div className="logout-button-component">
          <LogoutButton />
        </div>
      </div>
      <div className="current-user-container">
        <img src={user?.profile_pic} alt="user-pfp" className="user-pfp" />
        <div className="current-user-username">@{user?.username}</div>
      </div>
    </nav>
  );
};

export default NavBar;
