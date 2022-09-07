import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../store/buzzes";
import EditBuzzForm from "./HomePage/EditBuzzModal/EditBuzzForm";
import EditBuzzModal from "../components/HomePage/EditBuzzModal";
import DeleteBuzzModal from "./HomePage/DeleteBuzzModal";

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

  console.log('buzz:', buzz)

  return (
    <div>
      <div key={buzz?.id} className="single-buzz">
        {user && user?.id == buzz?.user_id ? (
          <>
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
              <div className="ServerPage-NavBar-buttons">
                {showDropdown && <EditBuzzModal buzz={buzz} id={buzz.id} />}
                {showDropdown && <DeleteBuzzModal buzz={buzz} />}
              </div>
            </div>
            <div>
              {buzz?.content}
              <img src={buzz?.image_url} className="single-buzz-img" alt="" />
            </div>
          </>
        ) : (
          <>
            <div>
              {buzz?.content}
              <img src={buzz?.image_url} className="single-buzz-img" alt="" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuzzDetails;
