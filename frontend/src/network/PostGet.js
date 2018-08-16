//currently not working!!!!!
export default class PostGet {

    constructor() {
        this.safePost = this.safePost.bind(this) // React binding stuff
        this.safeGet = this.safeGet.bind(this)
    }

    //posting data to server API (arbitrary url)
    safePost(url, email, password) {
        return new Promise((resolve, reject) => {
            return fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }).then(response => {
                response.json().then(json => {
                    if (!response.ok) {
                        return reject(json);
                    }
                    resolve(json);
                }).catch(e => reject(e));
            }).catch(e => reject(e))
        })
    }

    //getting data from server API (arbitrary url)
    safeGet(url) {
        return new Promise((resolve, reject) => {
            return fetch(url, {
                method: "get",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": localStorage.getItem("token")//authorized user account
                },
            }).then(response => {
                response.json().then(json => {
                    if (!response.ok) {
                        return reject(json);
                    }
                    resolve(json);//.then(json => { return json });
                }).catch(e => reject(e));
            }).catch(e => reject(e))
        })
    }

    /*
    //getting data from server API (arbitrary url)
    getpost(url) {
        fetch(url,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": localStorage.getItem("token")//authorized user account
                }
            })
            .then(res => res.json())
            .then(data => this.setState({ posts: data }));
    }

    //posting data to server API (arbitrary url)
    postreq(url, email, password) {
        fetch(url, {
            method: "post",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => this.setState({ posts: data }))
    }
*/

}