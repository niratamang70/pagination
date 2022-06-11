import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { usersReducer } from './reducers';

const rootReducer = combineReducers({
  User: usersReducer
});
const initialState = {};
const middleware = [thunk];

const store = configureStore(
  { reducer: rootReducer, initialState },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
