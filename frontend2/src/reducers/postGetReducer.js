import { GET_POSTS, GET_MY_POSTS, NEW_POST, DEL_POST, ERROR } from '../actions/types';

const initialState = {
    posts: [],
    myposts: [],
    newpost: {},
    posting: false,
    delpostid: null,
    error: false,
    errormsg: ""
}

//the reducer is a switch gate to whatever state updates based on the action
//receiving output from action.payload, i.e. like database response to an action (ex. getPosts action)
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                error: false
            };
        case GET_MY_POSTS:
            return {
                ...state,
                myposts: action.payload,
                error: false,
            };
        case NEW_POST:
            return {
                ...state,
                newpost: action.payload,
                error: false,
                posting: false
            };
        case DEL_POST:
            return {
                ...state,
                delpostid: action.payload.id,
                error: false
            };
        case ERROR: //error post, get or delete
            return {
                ...state,
                error: true,
                errormsg: action.payload.message
            };
        default:
            return state;
    }
}