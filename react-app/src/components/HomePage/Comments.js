import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getComments } from "../../store/comments";

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => Object.values(state?.comments));
  let { buzzId } = useParams();
  buzzId = Number(buzzId);
  const buzz = useSelector((state) => state?.buzzes[buzzId]);
  const commentsByBuzz = Object.values(comments).filter((comment) => comment?.buzz_id === buzzId)

  console.log("commentsByBuzz:", commentsByBuzz);

  useEffect(() => {
    dispatch(getComments(buzzId));
  }, [buzzId, dispatch]);

  if (!comments) return null;

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      {commentsByBuzz.map((ele) => (
        <div className="single-comment">
          <div>{ele.content}</div>
        </div>

      ))}
    </div>
  );
};

export default Comments;
