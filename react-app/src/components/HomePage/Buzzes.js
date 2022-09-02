import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../../store/buzzes";

const Buzzes = () => {
  const dispatch = useDispatch();
  // const allBuzzes = useSelector((state) => Object.values(state.buzzes));
  const user = useSelector((state) => state.session.user)
  const username = user.username
  const buzzes = useSelector((state) => state.buzzes)

  console.log('buzzes:', buzzes)
  console.log('username:', username)

  useEffect(() => {
    dispatch(getBuzzes());
  }, [dispatch]);

  // if (!allBuzzes) return null;

  return (
    <>
      {/* {allBuzzes.map((ele) => (
        <div key={ele.id}>
          {ele.content}, {ele.image_url}
        </div>
      ))} */}
    </>
  );
};

export default Buzzes
