
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
                    Authorization: localStorage.getItem('id_token'),
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                },
            }).then(response => {
                response.json().then(json => {
                    if (!response.ok) {
                        reject(json);
                    }
                    resolve(json);//.then(json => { return json });
                }).catch(e => reject(e));
            }).catch(e => reject(e))
        })
    }

    //posting data to server API (arbitrary url)
    safePost2(url, name, email, password) {

        return new Promise((resolve, reject) => {
            return fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    name,
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

}