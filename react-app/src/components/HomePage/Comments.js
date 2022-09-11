import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getComments } from "../../store/comments";
import CommentForm from "./CommentForm";
import "../CSS/Comments.css";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";

const Comments = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session.user);
  const [users, setUsers] = useState([]);
  const comments = useSelector((state) => Object.values(state?.comments));
  let { buzzId } = useParams();
  buzzId = Number(buzzId);
  const buzz = useSelector((state) => state?.buzzes[buzzId]);
  const commentsByBuzz = Object.values(comments).filter(
    (comment) => comment?.buzz_id === buzzId
  );
  const [editActive, setEditActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const editComment = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    dispatch(getComments(buzzId));

    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [buzzId, dispatch]);

  if (!comments) return null;

  return (
    <div className="comments-container">
      <div className="comment-form-container">
        <CommentForm />
      </div>
      <div className="list-comments">
        {commentsByBuzz.map((ele) => (
          <div className="single-comment">
            {user && user?.id == ele?.user_id ? (
              <>
                <div className="comment-content">
                <div className="user-container">
                      <img
                        src={users[ele?.user_id - 1]?.profile_pic}
                        alt=""
                        className="buzz-pfp"
                      />
                      {`@${users[ele?.user_id - 1]?.username}`}
                    </div>
                  <div>{ele.content}</div>
                </div>
                <div className="comment-options">
                  <div
                    className="Buzzes-name"
                    onClick={() => {
                      editComment();
                      setEditActive(!editActive);
                    }}
                  >
                    <button className="buzz-options-button">
                      <i className="fa-solid fa-ellipsis fa-xl"></i>
                    </button>
                  </div>
                  <div className="options-buttons">
                    {showDropdown && <EditCommentModal comment={ele} />}
                    {showDropdown && <DeleteCommentModal comment={ele} />}
                  </div>
                </div>
              </>
            ) : (
              <>
                  <div className="comment-content">
                  <div className="user-container">
                      <img
                        src={users[ele?.user_id - 1]?.profile_pic}
                        alt=""
                        className="buzz-pfp"
                      />
                      {`@${users[ele?.user_id - 1]?.username}`}
                    </div>
                  <div>{ele.content}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
