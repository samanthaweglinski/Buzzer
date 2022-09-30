import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./CSS/UserProfile.css";
import NavBar from "./NavBar";
import { getBuzzes } from "../store/buzzes";

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const userBuzzes = buzzes.filter(function (buzz) {
    return buzz.user_id == userId
  })

  // console.log({getUserBuzzes})

  useEffect(() => {
    dispatch(getBuzzes()); // dispatch getBuzzes thunk which calls getBuzzes action

    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      dispatch(getBuzzes());
      setUser(user);
    })();
  }, [dispatch, userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-left-container">
        <NavBar />
      </div>
      <div className="user-profile-mid-container">
        <div className="user-profile-mid-top">
          <div className="user-details">
            <img src={user?.profile_pic} alt="" className="user-pfp" />
            <div className="user-username">{user.username}</div>
          </div>
          <div className="bio">{user.bio}</div>
        </div>
        <div className="user-profile-mid-bottom">
          <div className="user-tweets">
            {userBuzzes.map((ele) => (
              <>
                {ele.content}
              </>
            ))}
            {/* {buzzes.map((ele) => (
              <div className="single-buzz">
                {userId == ele?.user_id ? (
                  <>
                    <div className="buzz-content">
                      <Link
                        to={`/buzzes/${ele.id}`}
                        key={ele.id}
                        className="single_buzz"
                      >
                        <div className="single-buzz-content-and-image">
                          <div className="user-container">
                            <Link
                              to={`/users/${users[ele?.user_id - 1]?.id}`}
                              key={users[ele?.user_id - 1]}
                              className="single_buzz"
                            >
                              <img
                                src={users[ele?.user_id - 1]?.profile_pic}
                                alt=""
                                className="buzz-pfp"
                              />
                              {`@${users[ele?.user_id - 1]?.username}`}
                            </Link>
                          </div>
                          <div className="buzz-content">{ele.content}</div>
                          <div>
                            <img
                              src={ele.image_url}
                              className="single-buzz-img"
                              alt=""
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    Not user's tweet, will filter out
                  </>
                )}
              </div>
            ))} */}
          </div>
        </div>
      </div>
      <div className="user-profile-right-container">Right Container</div>
    </div>
  );
}
export default User;
