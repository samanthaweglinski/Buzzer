import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes, likeBuzz } from "../store/buzzes";
import EditBuzzModal from "../components/HomePage/EditBuzzModal";
import DeleteBuzzModal from "./HomePage/DeleteBuzzModal";
import NavBar from "./NavBar";
import "./CSS/BuzzDetails.css";
import Comments from "./HomePage/Comments";
import { getComments } from "../store/comments";
import solidHeart from "../components/images/solid_heart.svg";
import hollowHeart from "../components/images/hollow_heart.svg";

const BuzzDetails = () => {
  let { buzzId } = useParams();
  buzzId = Number(buzzId);
  const dispatch = useDispatch();
  const history = useHistory();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  const buzz = useSelector((state) => state?.buzzes[buzzId]);
  const user = useSelector((state) => state?.session.user);
  const [users, setUsers] = useState([]);
  const [editActive, setEditActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [likeCounter, setLikeCounter] = useState(buzz?.likes?.length);
  const [likesArray, setLikesArray] = useState(buzz?.likes ?? []);
  const [likedBuzz, setLikedBuzz] = useState(
    likesArray?.find((like) => like.user_id === user.id)
  );

  const editBuzz = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    dispatch(getBuzzes(buzzId)); // dispatch getBuzzes thunk which calls getBuzzes action

    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch, buzzId]);

  useEffect(() => {
    if (likedBuzz) {
      setIsLikedByUser(true);
    }
  }, [likesArray.length, likedBuzz]);

  if (!buzzes) return null;

  const handleLike = async (e) => {
    e.stopPropagation();
    if (isLikedByUser) {
      const unliked = fetch(`/api/likes/${likedBuzz.id}`, {
        method: "DELETE",
      });
      setIsLikedByUser(false);
      setLikeCounter((prev) => prev - 1);
      setLikedBuzz(null);
    } else {
      const like = await dispatch(likeBuzz(buzz.id));
      setIsLikedByUser(true);
      setLikedBuzz(like);
      setLikeCounter((prev) => prev + 1);
    }
  };

  return (
    <div className="buzz-details-main-container">
      <div className="buzz-details-left-container">
        <NavBar />
      </div>
      <div className="buzz-details-mid-container">
        <div key={buzz?.id} className="specific-buzz">
          {user && user?.id == buzz?.user_id ? (
            <>
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
                    className={`buzz icon heart ${
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
            </>
          ) : (
            <>
              <div className="buzz-content">
                <div className="user-container">
                  <img
                    src={users[buzz?.user_id - 1]?.profile_pic}
                    alt=""
                    className="buzz-pfp"
                  />
                  {`@${users[buzz?.user_id - 1]?.username}`}
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
            </>
          )}
        </div>
        <div className="comments-for-single-buzz">
          <Comments />
        </div>
      </div>
      <div className="buzz-details-right-container"></div>
    </div>
  );
};

export default BuzzDetails;
