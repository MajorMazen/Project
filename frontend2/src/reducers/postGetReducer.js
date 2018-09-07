import { GET_POSTS, GET_MY_POSTS, NEW_POST, DEL_POST, ERROR, POSTING, GET } from '../actions/types';

const initialState = {
    posts: [],
    myposts: [],
    newpost: {},
    data: [],
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
                error: false,
                getting: false,
            };
        case GET_MY_POSTS:
            return {
                ...state,
                myposts: action.payload,
                error: false,
                getting: false,
            };
        case GET:
            return {
                ...state,
                data: action.payload,
                getting: false,
                error: false
            }
        case POSTING:
            return {
                ...state,
                posting: action.payload, //true
            }
        case NEW_POST:
            return {
                ...state,
                newpost: action.payload,
                error: false,
                posting: false,
                getting: false
            };
        case DEL_POST:
            return {
                ...state,
                delpostid: action.payload.id,
                error: false,
                getting: false,
                posting: false
            };
        case ERROR: //error post, get or delete
            return {
                ...state,
                error: true,
                errormsg: action.payload.message,
                getting: false,
                posting: false
            };
        default:
            return state;
    }
}