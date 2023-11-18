import { createStore } from 'redux';
import { combineReducers } from 'redux';
import fanLetter from 'modules/fanLetter';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  fanLetter,
});
const store = createStore(rootReducer, composeWithDevTools());

export default store;
