export const GET_JSON_DATA = 'fanLetter/JSON_DATA';
export const SELECTED_DATA = 'fanLetter/SELECTED_DATA';
export const ACTIVE_IMG = 'fanLetter/ACTIVE_IMG';

export const getJsonData = payload => ({
  type: GET_JSON_DATA,
  payload,
});
export const selectedData = payload => ({
  type: SELECTED_DATA,
  payload,
});
export const isActive = payload => ({
  type: ACTIVE_IMG,
  payload,
});

const initialState = {
  data: [],
  selectedData: null,
  isActive: null,
};

const fanLetter = (state = initialState, action) => {
  switch (action.type) {
    case GET_JSON_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SELECTED_DATA:
      return {
        ...state,
        selectedData: action.payload,
      };
    case ACTIVE_IMG:
      return {
        ...state,
        isActive: action.payload,
      };
    default:
      return state;
  }
};

export default fanLetter;
