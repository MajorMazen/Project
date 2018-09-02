import { LOGIN, REGISTER, LOGOUT, IS_AUTH, GET_USER_INFO, ERROR } from '../actions/types';

const initialState = {
    id: "",
    name: "",
    email: "",
    isauth: false,
    error: false,
    errormsg: ""
}

//the reducer is a switch gate to whatever state updates based on the action
//receiving output from action.payload, i.e. like database response to an action (ex. login action)
export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isauth: true,
                error: false
            };
        case REGISTER:
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isauth: true,
                error: false
            };
        case LOGOUT:
            return {
                ...state,
                isauth: action.payload,
                error: false
            };
        case IS_AUTH:
            return {
                ...state,
                isauth: action.payload,
            };
        case GET_USER_INFO:
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
            };
        case ERROR: //login or registration error 
            return {
                ...state,
                error: true,
                isauth: false,
                errormsg: action.payload.message
            };
        default:
            return state;
    }
}