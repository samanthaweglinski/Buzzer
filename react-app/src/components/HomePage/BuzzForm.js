import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createBuzz } from "../../store/buzzes";
import "../CSS/BuzzForm.css";

const BuzzForm = () => {
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(createBuzz(content, image_url));
    if (data) {
      setErrors(data);
    }
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const updateImage = (e) => {
    setImageUrl(e.target.value);
  };

  return (
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
  );
};

export default BuzzForm;
