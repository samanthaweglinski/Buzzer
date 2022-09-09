import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBuzzes, updateBuzz } from "../../../store/buzzes";
import "../../CSS/EditBuzzForm.css"

const EditBuzzForm = ({ buzz, onClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [content, setContent] = useState(buzz?.content);
  const [image_url, setImageUrl] = useState(buzz?.image_url);
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: buzz?.id,
      content,
      image_url: image_url
    };

    const response = await dispatch(updateBuzz(payload));

    if (response) {
      await dispatch(getBuzzes());
      setShowModal(false);
      setShowDropdown(false);
      history.push('/')
    }
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const updateImage = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <div className="dropdown-container">
      <div className="edit-buzz-button" onClick={() => setShowModal(true)}>
        <form onSubmit={handleSubmit} className="edit-buzz-form">
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
            <div className="edit-buzz-modal-image">
              <label className="edit-buzz-modal-image-label">Edit Image</label>
              <div className="edit-buzz-modal-input-image-outer">
                <input
                  name="server_pic"
                  className="edit-buzz-modal-input-imag-inner"
                  placeholder="https://image.url"
                  value={image_url}
                  onChange={updateImage}
                />
              </div>
            </div>
          </div>
          <div className="edit-buzz-buttons-container">
            <button type="submit" className="edit-buzz-modal-submit-button">
              Update Buzz
            </button>
            <div className="delete-option cancel" onClick={onClick}>Cancel</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBuzzForm;
