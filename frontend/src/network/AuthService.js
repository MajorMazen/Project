
import decode from 'jwt-decode';
import PostGet from './PostGet'

export default class AuthService {
    constructor() {
        this.PostGet = new PostGet();
    }

    //token has to be set outside the scope of this fn, the promise is awaited and then set in authActions
    login = (url, email, password) => {
        // outputs a token promise from server api using the fetch method
        return this.PostGet.safeLogin(url, email, password)
    }

    //token added to server response for a signup ***
    register = (url, name, email, password) => {
        // outputs a token promise from server api using the fetch method
        return this.PostGet.safeRegister(url, name, email, password)
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getUserInfo().token // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }


    setUserInfo = (response) => {
        // Saves user token to localStorage
        window.localStorage.setItem('id_token', response.token);
        window.localStorage.setItem('user_name', response.name);
        window.localStorage.setItem('user_email', response.email);
        const decoded = decode(response.token);
        window.localStorage.setItem('user_id', decoded.id);
    }

    getUserInfo() {
        // Retrieves the user token from localStorage
        return {
            token: window.localStorage.getItem('id_token'),
            name: window.localStorage.getItem('user_name'),
            email: window.localStorage.getItem('user_email'),
            id: window.localStorage.getItem('user_id')
        }
    }


    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getUserInfo().token);
    }


    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
