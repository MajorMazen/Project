import AuthService from '../network/AuthService';
import { LOGIN, REGISTER, IS_AUTH, LOGOUT, GET_USER_INFO, ERROR } from './types';

const domain = ''; //server domain

//for simplicity, this calls in class AuthService (Generic class for authorization service)
this.AuthService = new AuthService();


export const login = (email, password) => (dispatch) => {
    const response = this.AuthService.login(domain + '/users/login', email, password);//promise resolution awaited before saving to the local storage

    //object returned in state tree has to be an object (resolved promise)
    //.then in place of fn awaits which implies an async wrapper fn and unresolved promise dispatches
    response.then((response) => {
        this.AuthService.setUserInfo(response); //set in local storage
        dispatch({
            type: LOGIN,
            payload: response
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })

}

export const register = (name, email, password) => (dispatch) => {
    const response = this.AuthService.register(domain + '/users/register', name, email, password);

    response.then((response) => {
        this.AuthService.setUserInfo(response); //set in local storage
        dispatch({
            type: REGISTER,
            payload: response
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })

}

export const isAuth = () => dispatch => {
    const isauth = this.AuthService.loggedIn();
    dispatch({
        type: IS_AUTH,
        payload: isauth
    })
}

//log out will remove token from local storage and update state
export const logout = () => dispatch => {
    this.AuthService.logout();
    const isauth = false;
    dispatch({
        type: LOGOUT,
        payload: isauth
    })
}

export const getUserInfo = () => dispatch => {
    const info = this.AuthService.getUserInfo();
    dispatch({
        type: GET_USER_INFO,
        payload: info
    })
}