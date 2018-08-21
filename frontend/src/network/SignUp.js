
import PostGet from './PostGet'

export default class SignUp {
    // Initializing and tying fns to global pointer scope
    constructor(domain) {
        this.domain = domain || 'http://localhost:5000' // API server domain
        this.PostGet = new PostGet();
    }

    //token has to be set outside the scope of this fn
    signup = (name, email, password) => {
        // Get a token from api server using the fetch api
        const url = `${this.domain}/users/register`;
        return this.PostGet.safeRegister(url, name, email, password)
    }


}
