import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../../store/buzzes";
import EditBuzzForm from "./EditBuzzModal/EditBuzzForm";
import "../CSS/Buzzes.css";
import { Link } from "react-router-dom";

const Buzzes = () => {
  const dispatch = useDispatch();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  // const user = useSelector((state) => state?.session?.user)
  const [showDropdown, setShowDropdown] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getBuzzes()); // dispatch getBuzzes thunk which calls getBuzzes action
  }, [dispatch]);

  if (!buzzes) return null;

  const editBuzz = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="buzzes-container">
      {buzzes.map((ele) => (
        <div key={ele.id} className="single-buzz">
          <div className="Buzz-NavBar">
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
            <div className="ServerPage-NavBar-buttons"></div>
            {showDropdown && <EditBuzzForm buzz={ele} id={ele.id} />}
          </div>
          <Link to={`/buzzes/${ele.id}`} key={ele.id} className="single_buzz">
            <div className="single-buzz-content-and-image">
              <div>{ele.content}</div>
              <div>
                <img src={ele.image_url} className="single-buzz-img" alt="" />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Buzzes;
