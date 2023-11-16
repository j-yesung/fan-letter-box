export const GET_JSON_DATA = 'fanLetter/JSON_DATA';
export const SELECTED_DATA = 'select/JSON_DATA';

export const getJsonData = payload => ({
  type: GET_JSON_DATA,
  payload,
});
export const selectedData = payload => ({
  type: SELECTED_DATA,
  payload,
});

const initialState = {
  data: [],
  selectedData: null,
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
    default:
      return state;
  }
};

export default fanLetter;
