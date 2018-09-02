
export default class PostGet {

    //for post requests with authorization (ex. follow user, url has the id of the user to follow)
    safePost(url) {

        return new Promise((resolve, reject) => {
            return fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: localStorage.getItem('id_token')
                }
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


    //getting data from server API (arbitrary url ex user page)
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

    //for posting links, has inputs (api request and link to post)
    postItem(url, linkurl) {

        return new Promise((resolve, reject) => {
            return fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: localStorage.getItem('id_token')
                },
                body: JSON.stringify({
                    linkurl
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


    safeLogin(url, email, password) {

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


    safeRegister(url, name, email, password) {

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