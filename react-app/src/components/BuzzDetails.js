import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../store/buzzes";
import EditBuzzForm from "./HomePage/EditBuzzModal/EditBuzzForm";

const BuzzDetails = () => {
  const [hideButtons, setHideButtons] = useState(false);
  let { buzzId } = useParams();
  buzzId = Number(buzzId);
  const dispatch = useDispatch();
  const history = useHistory();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  const buzz = useSelector((state) => state.buzzes[buzzId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [editActive, setEditActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const editBuzz = () => {
    setShowDropdown(!showDropdown);
  };

  console.log(buzz)

  useEffect(() => {
    dispatch(getBuzzes()); // dispatch getBuzzes thunk which calls getBuzzes action
  }, [dispatch]);

  return (
    <div>
      <div key={buzz.id} className="single-buzz">
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
          {showDropdown && <EditBuzzForm buzz={buzz} id={buzz.id} />}
        </div>
      <div>
        {buzz.content}
        <img src={buzz.image_url} className="single-buzz-img" alt="" />
      </div>
      </div>
    </div>
  );
};

export default BuzzDetails;
