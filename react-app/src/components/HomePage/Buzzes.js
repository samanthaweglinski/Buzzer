import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes, likeBuzz } from "../../store/buzzes";
import "../CSS/Buzzes.css";
import { Link, NavLink } from "react-router-dom";
import EditBuzzModal from "./EditBuzzModal";
import DeleteBuzzModal from "./DeleteBuzzModal";
import solidHeart from "../../components/images/solid_heart.svg";
import hollowHeart from "../../components/images/hollow_heart.svg";

const Buzzes = () => {
  const dispatch = useDispatch();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  const user = useSelector((state) => state?.session.user);
  const [users, setUsers] = useState([]);
  const [editActive, setEditActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    dispatch(getBuzzes()); // dispatch getBuzzes thunk which calls getBuzzes action

    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);

  const editBuzz = () => {
    setShowDropdown(!showDropdown);
  };

  if (!buzzes) return null;

  return (
    <div className="buzzes-container">
      {buzzes.map((ele) => {
        let isLikedByUser = false;
        let likeCounter = ele?.likes?.length;
        let likesArray = ele?.likes;
        let likedBuzz = likesArray.find((like) => like.user_id === user.id);
        console.log({likedBuzz})

        const handleLike = async (e) => {
          e.stopPropagation();
          if (isLikedByUser) {
            const unliked = fetch(`/api/likes/${likedBuzz?.id}`, {
              method: "DELETE",
            });
            isLikedByUser = false;
            likeCounter = (prev) => prev - 1;
            likedBuzz = null;
          } else {
            const like = await dispatch(likeBuzz(ele?.id));
            isLikedByUser = true;
            likedBuzz = like;
            likeCounter = (prev) => prev + 1;
          }
        };

        return (
          <div key={ele.id + `${isLikedByUser}`} className="single-buzz">
            {user && user?.id == ele?.user_id ? (
              <>
                <div className="buzz-content">
                  <Link
                    to={`/buzzes/${ele.id}`}
                    key={ele.id}
                    className="single_buzz"
                  >
                    <div className="single-buzz-content-and-image">
                      <div className="user-container">
                        <Link
                          to={`/users/${users[ele?.user_id - 1]?.id}`}
                          key={users[ele?.user_id - 1]}
                          className="single_buzz"
                        >
                          <img
                            src={users[ele?.user_id - 1]?.profile_pic}
                            alt=""
                            className="buzz-pfp"
                          />
                          {`@${users[ele?.user_id - 1]?.username}`}
                        </Link>
                      </div>
                      <div className="buzz-content">{ele.content}</div>
                      <div>
                        <img
                          src={ele.image_url}
                          className="single-buzz-img"
                          alt=""
                        />
                      </div>
                    </div>
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
                    {showDropdown && <EditBuzzModal buzz={ele} id={ele.id} />}
                    {showDropdown && <DeleteBuzzModal buzz={ele} />}
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
              </>
            ) : (
              <>
                <div className="buzz-content">
                  <Link
                    to={`/buzzes/${ele.id}`}
                    key={ele.id}
                    className="single_buzz"
                  >
                    <div className="single-buzz-content-and-image">
                      <div className="user-container">
                        <Link
                          to={`/users/${users[ele?.user_id - 1]?.id}`}
                          key={users[ele?.user_id - 1]}
                          className="single_buzz"
                        >
                          <img
                            src={users[ele?.user_id - 1]?.profile_pic}
                            alt=""
                            className="buzz-pfp"
                          />
                          {`@${users[ele?.user_id - 1]?.username}`}
                        </Link>
                      </div>
                      <div className="buzz-content">{ele.content}</div>
                      <div>
                        <img
                          src={ele.image_url}
                          className="single-buzz-img"
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
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
        );
      })}
    </div>
  );
};

export default Buzzes;
