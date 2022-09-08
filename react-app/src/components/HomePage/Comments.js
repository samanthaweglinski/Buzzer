import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getComments } from "../../store/comments";
import CommentForm from "./CommentForm";
import "../CSS/Comments.css";
import EditCommentModal from "./EditCommentModal";

const Comments = () => {
  const dispatch = useDispatch();
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
            <div className="comment-content">
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
                {/* {showDropdown && <DeleteBuzzModal buzz={buzz} />} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
