const GET_COMMENTS = "comments/GET_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const getCommentsAction = (comments, buzzId) => ({
  type: GET_COMMENTS,
  comments,
  buzzId,
});

const createCommentAction = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

const updateCommentAction = (comment, commentId) => ({
  type: UPDATE_COMMENT,
  comment,
  commentId,
});

const deleteCommentAction = (commentId, buzzId) => ({
  type: DELETE_COMMENT,
  commentId,
  buzzId,
});

export const getComments = (buzzId) => async (dispatch) => {
  const response = await fetch(`/api/buzzes/${buzzId}/comments`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(getCommentsAction(comments, buzzId));
    return comments;
  }
};

export const createComment = (commentData) => async (dispatch) => {
  const { content, user_id, buzz_id } = commentData;

  const response = await fetch(`/api/buzzes/${commentData.buzz_id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      user_id,
      buzz_id,
    }),
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(createCommentAction(comment));
    return comment;
  }
};

export const updateComment = (commentData) => async (dispatch) => {
  const { id, content, user_id, buzz_id } = commentData;

  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      content,
      user_id,
      buzz_id,
    }),
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(updateCommentAction(comment));
    return comment;
  }
};

export const deleteComment = (commentId, buzzId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteCommentAction(commentId, buzzId));
  }
};

const commentReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_COMMENTS: {
      newState = { ...state };
      action.comments.comments.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return newState;
    }
    case CREATE_COMMENT: {
      let newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    }
    case UPDATE_COMMENT: {
      let newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    }
    case DELETE_COMMENT: {
      newState = { ...state };
      delete newState[action.commentId];
      return newState;
    }
    default:
      return state;
  }
};

export default commentReducer;
