import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getComments, updateComment } from "../../../store/comments";

const EditCommentForm = ({ comment, onClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [content, setContent] = useState(comment?.content);
  const user = useSelector((state) => state.session.user);
  const buzz = useSelector((state) => state?.buzz);
  let { buzzId } = useParams();
  buzzId = Number(buzzId);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      setErrors(["Content is required"]);
      return;
    }

    if (content && content.trim().length === 0) {
      setErrors(["Content field cannot be empty"]);
      return;
    }

    if (content.length > 280) {
      setErrors(["Content length cannot exceed 280 characters"]);
      return;
    }

    const payload = {
      id: comment?.id,
      content: content,
      user_id: user?.id,
      buzz_id: buzz?.id,
    };

    const response = await dispatch(updateComment(payload));

    if (response) {
      await dispatch(getComments());
      setShowModal(false);
      setShowDropdown(false);
      history.push(`/buzzes/${buzzId}`);
    }
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="dropdown-container">
      <div className="edit-buzz-button" onClick={() => setShowModal(true)}>
        <form onSubmit={handleSubmit} className="block">
          <div className="errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <div className="edit-buzz-modal-content">
              <label className="edit-buzz-modal-main-label">Edit Content</label>
              <div className="edit-buzz-modal-input-content-outer">
                <input
                  name="name"
                  className="edit-buzz-modal-input-content-inner"
                  value={content}
                  onChange={updateContent}
                />
              </div>
            </div>
          </div>
          <div className="edit-buzz-buttons-container">
            <button type="submit" className="edit-buzz-modal-submit-button">
              Update Comment
            </button>
            <div className="delete-option cancel" onClick={onClick}>
              Cancel
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditCommentForm;
