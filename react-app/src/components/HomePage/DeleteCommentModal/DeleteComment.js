import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteComment } from "../../../store/comments";
import "../../CSS/DeleteCommentForm.css"

function DeleteComment({ comment, onClick }) {
  let dispatch = useDispatch();
  let history = useHistory();

  const onDelete = () => {
    dispatch(deleteComment(comment.id));
    history.push("/");
  };

  return (
    <div className="delete-buzz">
      <div className="delete-head">
        <h3>Delete comment?</h3>
        <div>Are you sure you want to delete this comment?</div>
      </div>
      <div className="comment-delete-option delete-button" onClick={onDelete}>
        Delete
      </div>
      <div className="comment-delete-option cancel" onClick={onClick}>
        Cancel
      </div>
    </div>
  );
}

export default DeleteComment;
