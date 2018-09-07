import { FOLLOW_USER, UNFOLLOW_USER, GET_MY_FOLLOWING, ERROR } from '../actions/types';

const initialState = {
    myfollowing: [],
    error: false,
    errormsg: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                myfollowing: action.payload,
                error: false
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                myfollowing: action.payload,
                error: false
            };
        case GET_MY_FOLLOWING:
            return {
                ...state,
                myfollowing: action.payload,
            };
        case ERROR: //error following or unfollowing 
            return {
                ...state,
                error: true,
                errormsg: action.payload.message
            };
        default:
            return state;
    }
}