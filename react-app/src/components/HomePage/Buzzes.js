import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../../store/buzzes";
import "../CSS/Buzzes.css"

const Buzzes = () => {
  const dispatch = useDispatch();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  // const user = useSelector((state) => state?.session?.user)

  useEffect(() => {
    dispatch(getBuzzes()); // dispatch getBuzzes thunk which calls getBuzzes action
  }, [dispatch]);

  if (!buzzes) return null;

  return (
    <div className='buzzes_container'>
      {buzzes.map((ele) => (
        <div key={ele.id} className='single_buzz'>
          {ele.content}
          <img src={ele.image_url} className='single_buzz_img'/>
        </div>
      ))}
    </div>
  );
};

export default Buzzes
