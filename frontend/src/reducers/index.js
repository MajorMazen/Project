import { combineReducers } from 'redux';
import postGetReducer from './postGetReducer';
import followReducer from './followReducer';
import authReducer from './authReducer';

//root reducer for all secondary reducers
export default combineReducers({
    posts: postGetReducer,
    follow: followReducer,
    auth: authReducer
});