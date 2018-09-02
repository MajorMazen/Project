import { FOLLOW_USER, UNFOLLOW_USER, GET_MY_FOLLOWING, ERROR } from '../actions/types';

const initialState = {
    followedid: null,
    unfollowedid: null,
    myfollowing: [],
    error: false,
    errormsg: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                followedid: action.payload.id,
                error: false
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                unfollowedid: action.payload.id,
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