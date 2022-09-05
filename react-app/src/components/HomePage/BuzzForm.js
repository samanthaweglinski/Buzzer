import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBuzz } from "../../store/buzzes";
import "../CSS/BuzzForm.css";

const BuzzForm = ({ onClick }) => {
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const newErrors = [];
    if (content?.length > 280) {
      newErrors.push("Character limit of 280 exceeded.");
    }
    if (!content) {
      newErrors.push("Content is required!");
    }
    if (newErrors.length) {
      setErrors(newErrors);
    } else {
      setErrors([]);
    }
  }, [content, image_url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content: content,
      user_id: user.id,
      image_url: image_url,
    };

    // onClick()

    const res = await dispatch(createBuzz(payload));
    if (res) {
      history.push(`/`);
      // onClick()
    }
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const updateImage = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <div className="buzz-form">
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <input
            name="content"
            type="text"
            placeholder="What's on your mind?"
            value={content}
            onChange={updateContent}
          />
        </div>
        <div>
          <label htmlFor="image_url">Image</label>
          <input
            name="image_url"
            type="text"
            placeholder="Paste image URL here"
            value={image_url}
            onChange={updateImage}
          />
          <button type="submit">Buzz</button>
        </div>
      </form>
    </div>
  );
};

export default BuzzForm;
