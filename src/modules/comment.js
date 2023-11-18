const GET_LOCAL_COMMENT = 'comment/GET_LOCAL_COMMENT';
const ADD_COMMENT = 'comment/ADD_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';

export const getLocalCommentData = payload => {
  return {
    type: GET_LOCAL_COMMENT,
    payload,
  };
};
export const addComment = payload => {
  return {
    type: ADD_COMMENT,
    payload,
  };
};
export const deleteComment = payload => {
  return {
    type: DELETE_COMMENT,
    payload,
  };
};

const initialState = {
  comments: [],
};

const comment = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCAL_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload),
      };

    default:
      return state;
  }
};

export default comment;
