const GET_LOCAL_COMMENT = 'comment/GET_LOCAL_COMMENT';
const ADD_COMMENT = 'comment/ADD_COMMENT';
const EDIT_COMMENT = 'comment/EDIT_COMMENT';
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';
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
export const editComment = payload => {
  return {
    type: EDIT_COMMENT,
    payload,
  };
};
export const updateComment = (id, updateContent, updateDate) => {
  return {
    type: UPDATE_COMMENT,
    payload: {
      id,
      updateContent,
      updateDate,
    },
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
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.payload) {
            return {
              ...comment,
              isEditing: !comment.isEditing,
            };
          }
          return comment;
        }),
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              content: action.payload.updateContent,
              date: action.payload.updateDate,
              isEditing: false,
            };
          }
          return comment;
        }),
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
