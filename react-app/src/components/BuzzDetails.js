import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBuzzes } from "../store/buzzes";

const BuzzDetails = () => {
  const [hideButtons, setHideButtons] = useState(false);
  let { buzzId } = useParams()
  buzzId = Number(buzzId);
  const dispatch = useDispatch();
  const history = useHistory();
  const buzzes = useSelector((state) => Object.values(state?.buzzes));
  const sessionUser = useSelector((state) => state.session.user);
  const buzz = useSelector((state) => state.buzzes[buzzId])

  console.log('buzz', buzz)

  useEffect(() => {
    dispatch(getBuzzes()); // dispatch getBuzzes thunk which calls getBuzzes action
  }, [dispatch]);



  return (
    <div>
      {buzz.content}
      <img src={buzz.image_url} className="single-buzz-img" alt="" />
    </div>
  )
}

export default BuzzDetails
