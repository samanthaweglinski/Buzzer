import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../../store/buzzes";

const Buzzes = () => {
  const dispatch = useDispatch();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  const user = useSelector((state) => state?.session?.user)

  useEffect(() => {
    dispatch(getBuzzes()); // dispatch getBuzzes thunk which calls getBuzzes action
  }, [dispatch]);

  // if (!buzzes) return null;

  return (
    <>
      {buzzes.map((ele) => (
        <div key={ele.id}>
          {ele.content}, {ele.image_url}
        </div>
      ))}
    </>
  );
};

export default Buzzes
