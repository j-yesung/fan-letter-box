import { createStore } from 'redux';
import { combineReducers } from 'redux';
import fanLetter from 'modules/fanLetter';
import comment from 'modules/comment';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  fanLetter,
  comment,
});
const store = createStore(rootReducer, composeWithDevTools());

export default store;
