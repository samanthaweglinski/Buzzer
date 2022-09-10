import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBuzz } from "../../store/buzzes";
import "../CSS/BuzzForm.css";

const BuzzForm = () => {
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const errors = [];
    const imgRegex = new RegExp(
      /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
    );
    if (image_url && !imgRegex.test(image_url)) {
      errors.push(
        "Invalid Image Url. URL must contain a .png, .jpg, .jpeg, .gif, .png or .svg!"
      );
    }
    setErrors(errors);
  }, [image_url]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      setErrors(["Buzz content is required"]);
      return;
    }
    if (content && content.trim().length === 0) {
      setErrors(["Buzz content cannot be empty"]);
      return;
    }

    if (content.length > 280) {
      setErrors(["Buzz content cannot exceed 280 characters"]);
      return;
    }

    const payload = {
      content: content,
      user_id: user.id,
      image_url: image_url,
    };

    const res = await dispatch(createBuzz(payload));
    if (res) {
      history.push(`/`);
    }
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const updateImage = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <div className="buzz-form-container">
      <form onSubmit={handleSubmit} className="buzz-form">
        <div className="buzz-form-input-areas">
          <div className="errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="buzz-content-input">
            <label htmlFor="content"></label>
            <textarea
              name="content"
              type="text"
              placeholder="What's on your mind?"
              value={content}
              onChange={updateContent}
            />
            {/* <input
            name="content"
            type="text"
            placeholder="What's on your mind?"
            value={content}
            onChange={updateContent}
          /> */}
          </div>
          <div className="buzz-image-input">
            <label htmlFor="image_url"></label>
            <input
              name="image_url"
              type="text"
              placeholder="Paste optional image URL here"
              value={image_url}
              onChange={updateImage}
            />
          </div>
        </div>
        <div className="buzz-form-submit">
          <button type="submit">Buzz</button>
        </div>
      </form>
    </div>
  );
};

export default BuzzForm;
