import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../../store/buzzes";

const Buzzes = () => {
  const dispatch = useDispatch();
  const buzzes = useSelector((state) => Object.values(state));
  const user = useSelector((state) => state?.session?.user)
  const username = user.username
  // const buzzes = useSelector((state) => state.action)

  // console.log('buzzes:', buzzes)

  useEffect(() => {
    dispatch(getBuzzes());
  }, [dispatch]);


  // if (!buzzes) return null;

  return (
    <>
      {/* {buzzes.map((ele) => (
        <div key={ele.id}>
          {ele.content}, {ele.image_url}
        </div>
      ))} */}
      {username}
    </>
  );
};

export default Buzzes
