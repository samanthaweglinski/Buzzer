import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../../store/buzzes";
import "../CSS/Buzzes.css";
import { Link, NavLink } from "react-router-dom";

const Buzzes = () => {
  const dispatch = useDispatch();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(getBuzzes()); // dispatch getBuzzes thunk which calls getBuzzes action
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  // console.log('users:', users)

  if (!buzzes) return null;

  return (
    <div className="buzzes-container">
      {buzzes.map((ele) => (
        <div key={ele.id} className="single-buzz">
          <Link to={`/buzzes/${ele.id}`} key={ele.id} className="single_buzz">
            <div className="single-buzz-content-and-image">
              <div>
                {/* {`@${ele?.user_id}`} */}
                <img src={users[ele?.user_id].profile_pic} alt=""/>
                {`@${users[ele?.user_id].username}`}
              </div>
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
