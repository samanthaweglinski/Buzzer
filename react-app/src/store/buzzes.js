const GET_BUZZES = "buzzes/GET_BUZZES";
const CREATE_BUZZ = "buzzes/CREATE_BUZZ";
const UPDATE_BUZZ = "buzzes/UPDATE_BUZZ";
const DELETE_BUZZ = "buzzes/DELETE_BUZZ";
const LIKE_BUZZ = "buzzes/LIKE_BUZZ";

const getBuzzesAction = (buzzes) => ({
  type: GET_BUZZES,
  buzzes,
});

const createBuzzAction = (newBuzz) => ({
  type: CREATE_BUZZ,
  newBuzz,
});

const updateBuzzAction = (buzz) => ({
  type: UPDATE_BUZZ,
  buzz,
});

const deleteBuzzAction = (buzzId) => ({
  type: DELETE_BUZZ,
  buzzId,
});

const likeBuzzAction = (like) => ({
  type: LIKE_BUZZ,
  like,
});

export const getBuzzes = () => async (dispatch) => {
  const response = await fetch(`/api/buzzes/`);

  if (response.ok) {
    const buzzes = await response.json();
    dispatch(getBuzzesAction(buzzes));
    return buzzes;
  }
};

export const createBuzz = (buzzData) => async (dispatch) => {
  const { content, user_id, image_url } = buzzData;

  const response = await fetch(`/api/buzzes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      user_id,
      image_url,
    }),
  });

  if (response.ok) {
    const newBuzz = await response.json();
    dispatch(createBuzzAction(newBuzz));
    return newBuzz;
  }
};

export const updateBuzz = (buzzData) => async (dispatch) => {
  const { id, content, image_url } = buzzData;

  const response = await fetch(`/api/buzzes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      image_url,
    }),
  });

  if (response.ok) {
    const buzz = await response.json();
    dispatch(updateBuzzAction(buzz));
    return buzz;
  }
};

export const deleteBuzz = (id) => async (dispatch) => {
  const response = await fetch(`/api/buzzes/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const buzz = await response.json();
    dispatch(deleteBuzzAction(id));
    return buzz;
  }
};

export const likeBuzz = (id) => async (dispatch) => {
  const response = await fetch(`/api/buzzes/${id}/like`, {
    method: "POST",
  });
  if (response.ok) {
    const like = await response.json();
    await dispatch(likeBuzzAction(like));
    return like;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred, please try again."];
  }
};

const buzzReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_BUZZES: {
      newState = { ...state };
      for (let buzz of action.buzzes) newState[buzz.id] = buzz;
      return newState;
    }
    case CREATE_BUZZ: {
      newState = { ...state };
      newState[action.newBuzz.id] = action.newBuzz;
      return newState;
    }
    case UPDATE_BUZZ: {
      newState = { ...state };
      newState[action.buzz.id] = action.buzz;
      return newState;
    }
    case DELETE_BUZZ: {
      newState = { ...state };
      delete newState[action.buzzId];
      return newState;
    }
    case LIKE_BUZZ: {
      const newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
};

export default buzzReducer;
