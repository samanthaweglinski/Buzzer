import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { likeBuzz, getBuzzes } from "../store/buzzes";
import EditBuzzModal from "./HomePage/EditBuzzModal";
import DeleteBuzzModal from "./HomePage/DeleteBuzzModal";
import solidHeart from "../components/images/solid_heart.svg";
import hollowHeart from "../components/images/hollow_heart.svg";
import commentIcon from "../components/images/comment_icon.svg";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./CSS/Buzz.css";

const Buzz = ({ buzz, users }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state?.session.user);
  // const comments = useSelector((state) => state?.comments);
  const [likeCounter, setLikeCounter] = useState(buzz?.likes?.length);
  const [likesArray, setLikesArray] = useState(buzz?.likes);
  const [editActive, setEditActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [likedBuzz, setLikedBuzz] = useState(
    likesArray.find((like) => like.user_id === user.id)
  );

  // console.log({ comments });

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

  const goToPost = () => {
    history.push(`/buzzes/${buzz.id}`);
    // onClick()
  };

  return (
    <>
      {user && user?.id == buzz?.user_id ? (
        <div className="single-buzz">
          <div className="user-and-options-container">
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
          </div>
          <div className="buzz-content">
            <div className="content-container">
              <Link to={`/buzzes/${buzz?.id}`}>
                <div className="single-buzz-content">{buzz?.content}</div>
                <img src={buzz?.image_url} className="single-buzz-img" alt="" />
              </Link>
            </div>
          </div>
          <div className="comment-and-like-container">
            <div className="comment-icon-container">
              <Link to={`/buzzes/${buzz?.id}`}>
                <img
                  className="buzz icon comment"
                  src={commentIcon}
                  alt="comment-icon"
                />
                <div className="comment-counter">
                  {/* <span>{0}</span> */}
                </div>
              </Link>
            </div>
            <div className={`heart-info-container`}>
              <div onClick={handleLike} className="heart-icon-container">
                <img
                  className={`buzz icon heart ${
                    likedBuzz ? "liked" : "not-liked"
                  }`}
                  src={likedBuzz ? solidHeart : hollowHeart}
                  alt="heart-icon"
                />
              </div>
              <div className="like-counter">
                <span>{likeCounter}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="single-buzz">
          <div className="user-and-options-container">
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
            <div className="buzz-options">
              <button className="buzz-options-button">
                <Link to={`/buzzes/${buzz?.id}`}>
                  <i className="fa-solid fa-ellipsis fa-xl"></i>
                </Link>
              </button>
            </div>
          </div>
          <div className="buzz-content">
            <div className="content-container">
              <Link to={`/buzzes/${buzz?.id}`}>
                <div className="single-buzz-content">{buzz?.content}</div>
                <img src={buzz?.image_url} className="single-buzz-img" alt="" />
              </Link>
            </div>
          </div>
          <div className="comment-and-like-container">
            <div className="comment-icon-container">
              <Link to={`/buzzes/${buzz?.id}`}>
                <img
                  className="buzz icon comment"
                  src={commentIcon}
                  alt="comment-icon"
                />
                <div className="comment-counter">
                  {/* <span>{0}</span> */}
                </div>
              </Link>
            </div>
            <div className={`heart-info-container`}>
              <div onClick={handleLike} className="heart-icon-container">
                <img
                  className={`buzz icon heart ${
                    likedBuzz ? "liked" : "not-liked"
                  }`}
                  src={likedBuzz ? solidHeart : hollowHeart}
                  alt="heart-icon"
                />
              </div>
              <div className="like-counter">
                <span>{likeCounter}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Buzz;
