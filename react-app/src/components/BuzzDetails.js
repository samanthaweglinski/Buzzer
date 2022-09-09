import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../store/buzzes";
import EditBuzzModal from "../components/HomePage/EditBuzzModal";
import DeleteBuzzModal from "./HomePage/DeleteBuzzModal";
import NavBar from "./NavBar";
import "./CSS/BuzzDetails.css";
import Comments from "./HomePage/Comments";
import { getComments } from "../store/comments";

const BuzzDetails = () => {
  let { buzzId } = useParams();
  buzzId = Number(buzzId);
  const dispatch = useDispatch();
  const history = useHistory();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  const buzz = useSelector((state) => state?.buzzes[buzzId]);
  const user = useSelector((state) => state?.session.user);
  const [editActive, setEditActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const editBuzz = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    dispatch(getBuzzes(buzzId)); // dispatch getBuzzes thunk which calls getBuzzes action
  }, [dispatch, buzzId]);


  return (
    <div className="buzz-details-main-container">
      <div className="buzz-details-left-container">
        <NavBar />
      </div>
      <div className="buzz-details-mid-container">
        <div key={buzz?.id} className="specific-buzz">
          {user && user?.id == buzz?.user_id ? (
            <>
              <div className="buzz-content">
                <div>{buzz?.content}</div>
                <img src={buzz?.image_url} className="single-buzz-img" alt="" />
              </div>
              <div className="buzz-options">
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
                <div className="options-buttons">
                  {showDropdown && <EditBuzzModal buzz={buzz} id={buzz.id} />}
                  {showDropdown && <DeleteBuzzModal buzz={buzz} />}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="buzz-content">
                <div>{buzz?.content}</div>
                <img src={buzz?.image_url} className="single-buzz-img" alt="" />
              </div>
            </>
          )}
        </div>
        <div className="comments-for-single-buzz">
          <Comments/>
        </div>
      </div>
      <div className="buzz-details-right-container">
      </div>
    </div>
  );
};

export default BuzzDetails;

