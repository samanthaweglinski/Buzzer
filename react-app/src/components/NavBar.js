import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import bird from "../components/images/twitter_logo.svg";
import "./CSS/NavBar.css";

const NavBar = () => {
  const user = useSelector((state) => state?.session?.user);

  return (
    <nav className="left-nav">
      <div className="nav-icons">
        <div className="bee-img">
          <NavLink
            to="/"
            exact={true}
            activeClassName="active"
            className="home-link"
          >
            <img className="buzzer-icon" src={bird} alt="" />
            <div className="link-description">Home</div>
          </NavLink>
        </div>
        <div className="linkedin">
          <a
            href="https://www.linkedin.com/in/samanthaweglinski/"
            className="linkedin-link"
          >
            <i className="fa-brands fa-linkedin-in"></i>
            <div className="link-description">Linkedin</div>
          </a>
        </div>
        <div className="github">
          <a
            href="https://github.com/samanthaweglinski"
            className="github-link"
          >
            <i className="fa-brands fa-github"></i>
            <div className="link-description">Github</div>
          </a>
        </div>
      </div>
      <div className="current-user-container-outer">
        <Link to={`/users/${user?.id}`} className='current-user-container'>
          <img src={user?.profile_pic} alt="user-pfp" className="user-pfp" />
          <div className="current-user-username">@{user?.username}</div>
        </Link>
        <div className="logout-button-component">
          <LogoutButton />
          {/* <div className="link-description">Logout</div> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
