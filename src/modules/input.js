const SET_INPUT_ACTIVE = 'input/SET_INPUT_ACTIVE';

export const setInputActive = (fieldName, isActive) => {
  return {
    type: SET_INPUT_ACTIVE,
    payload: {
      fieldName,
      isActive,
    },
  };
};

const initialState = {
  isInputActive: {
    name: false,
    content: false,
  },
};

const input = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT_ACTIVE:
      return {
        ...state,
        isInputActive: {
          ...state.isInputActive,
          [action.payload.fieldName]: action.payload.isActive,
        },
      };

    default:
      return state;
  }
};

export default input;
