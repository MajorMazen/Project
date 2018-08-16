
import decode from 'jwt-decode';
export default class SignUp {
    // Initializing and tying fns to global pointer scope
    constructor(domain) {
        this.domain = domain || 'http://localhost:5000' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.signup = this.signup.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    signup(name, email, password) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/users/register`, {
            method: 'POST',
            header: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'POST',
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => {
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
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
