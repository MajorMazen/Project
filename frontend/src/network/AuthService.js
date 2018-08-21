
import decode from 'jwt-decode';
import PostGet from './PostGet'

export default class AuthService {
    // Initializing and tying fns to global pointer scope
    constructor(domain) {
        this.domain = domain || 'http://localhost:5000' // API server domain
        this.PostGet = new PostGet();
    }

    //token has to be set outside the scope of this fn
    login = (email, password) => {
        // Get a token from api server using the fetch api
        const url = `${this.domain}/users/login`;
        return this.PostGet.safeLogin(url, email, password)
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token || this.isTokenExpired(token) // handwaiving here
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

    setToken = (response) => {
        // Saves user token to localStorage
        let idToken = response.token;
        window.localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return window.localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
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
