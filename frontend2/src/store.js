import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'

const initialState = {};
const middleware = [thunk];

//creating store or the global state, shared between components
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));//add compose later

export default store;