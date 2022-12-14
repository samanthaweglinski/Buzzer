import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createComment } from "../../store/comments";
import "../CSS/CommentForm.css";

const CommentForm = () => {
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");
  let { buzzId } = useParams();
  buzzId = Number(buzzId);
  const buzz = useSelector((state) => state?.buzzes[buzzId]);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      setErrors(["Comment content is required"]);
      return;
    }
    if (content && content.trim().length === 0) {
      setErrors(["Comment content cannot be empty"]);
      return;
    }

    if (content.length > 280) {
      setErrors(["Comment content cannot exceed 280 characters"]);
      return;
    }

    const payload = {
      content: content,
      user_id: user.id,
      buzz_id: buzz.id,
    };

    const res = await dispatch(createComment(payload));
    if (res) {
      history.push(`/buzzes/${buzzId}`);
    }
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <div className="errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="content">Comment: </label>
          <input
            name="content"
            type="text"
            placeholder="Comment on this Buzz"
            value={content}
            onChange={updateContent}
          />
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
