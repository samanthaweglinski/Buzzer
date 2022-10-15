import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { likeBuzz, getBuzzes } from "../store/buzzes";
import EditBuzzModal from "./HomePage/EditBuzzModal";
import DeleteBuzzModal from "./HomePage/DeleteBuzzModal";
import solidHeart from "../components/images/solid_heart.svg";
import hollowHeart from "../components/images/hollow_heart.svg";
import { Link, NavLink } from "react-router-dom";
import "./CSS/Buzz.css"

const Buzz = ({ buzz, users }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session.user);
  // const [isLikedByUser, setIsLikedByUser] = useState(buzz?.);
  const [likeCounter, setLikeCounter] = useState(buzz?.likes?.length);
  const [likesArray, setLikesArray] = useState(buzz?.likes);
  const [editActive, setEditActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [users, setUsers] = useState([]);
  const [likedBuzz, setLikedBuzz] = useState(
    likesArray.find((like) => like.user_id === user.id)
  );

  const editBuzz = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (likedBuzz) {
      const unliked = fetch(`/api/likes/${likedBuzz.id}`, {
        method: "DELETE",
      });
      // setIsLikedByUser(false);
      setLikeCounter((prev) => prev - 1);
      setLikedBuzz(null);
    } else {
      const like = await dispatch(likeBuzz(buzz.id));
      // setIsLikedByUser(true);
      setLikedBuzz(like);
      setLikeCounter((prev) => prev + 1);
    }
  };

  return (
    <>
      {user && user?.id == buzz?.user_id ? (
        <div className="single-buzz">
          <div className="buzz-content">
            <div className="user-container">
              <Link
                to={`/users/${buzz?.user_id}`}
                className="user-profile-link"
              >
                <img
                  src={users[buzz?.user_id - 1]?.profile_pic}
                  alt=""
                  className="buzz-pfp"
                />
                {`@${users[buzz?.user_id - 1]?.username}`}
              </Link>
            </div>
            <div className="content-container">
              <div>{buzz?.content}</div>
              <img src={buzz?.image_url} className="single-buzz-img" alt="" />
            </div>
          </div>
          <div className="buzz-options">
            <div
              className="Buzzes-name"
              onClick={() => {
                editBuzz();
                setEditActive(!editActive);
              }}
            >
              <button className="buzz-options-button">
                <i className="fa-solid fa-ellipsis fa-xl"></i>
              </button>
            </div>
            <div className="options-buttons">
              {showDropdown && <EditBuzzModal buzz={buzz} id={buzz.id} />}
              {showDropdown && <DeleteBuzzModal buzz={buzz} />}
            </div>
          </div>
          <div onClick={handleLike} className={`heart-info-container`}>
            <div className="heart-icon-container">
              <img
                className={`tweet icon heart ${
                  likedBuzz ? "liked" : "not-liked"
                }`}
                src={likedBuzz ? solidHeart : hollowHeart}
                alt="heart-icon"
              />
            </div>
            <div className="comment-counter">
              <span>{likeCounter}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="single-buzz">
          <div className="buzz-content">
            <div className="user-container">
              <Link
                to={`/users/${buzz?.user_id}`}
                className="user-profile-link"
              >
                <img
                  src={users[buzz?.user_id - 1]?.profile_pic}
                  alt=""
                  className="buzz-pfp"
                />
                {`@${users[buzz?.user_id - 1]?.username}`}
              </Link>
            </div>
            <div>{buzz?.content}</div>
            <img src={buzz?.image_url} className="single-buzz-img" alt="" />
          </div>
          <div onClick={handleLike} className={`heart-info-container`}>
            <div className="heart-icon-container">
              <img
                className={`tweet icon heart ${
                  likedBuzz ? "liked" : "not-liked"
                }`}
                src={likedBuzz ? solidHeart : hollowHeart}
                alt="heart-icon"
              />
            </div>
            <div className="comment-counter">
              <span>{likeCounter}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Buzz;
