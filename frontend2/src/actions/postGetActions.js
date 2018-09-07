import PostGet from '../network/PostGet';
import { GET_POSTS, GET_MY_POSTS, DEL_POST, NEW_POST, ERROR, POSTING, GET } from './types';

const domain = 'http://localhost:5000'; //server domain

//this calls in class PostGet (Generic class for making API requests)
this.PostGet = new PostGet();

//only needed if follow/unfollow is on same page, posts are 'unshifted' or 'spliced' in response, also myfollowing (re-render)
export const getPosts = () => (dispatch) => {
    const posts = this.PostGet.safeGet(domain + '/');//home page, posts of ppl which the user is following

    posts.then((posts) => {
        dispatch({
            type: GET_POSTS,
            payload: posts
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })
}

//myposts will be 'unshifted' in response to a new post action (server response awaited to capture new post id for href link to postItem component)
export const getMyPosts = () => (dispatch) => {
    const myposts = this.PostGet.safeGet(domain + '/posts/me');//my own page (posts i made)

    myposts.then((myposts) => {
        dispatch({
            type: GET_MY_POSTS,
            payload: myposts
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })
}

//calling this as an action isn't necessary
export const get = (url) => (dispatch) => {
    const data = this.PostGet.safeGet(url);//home page, posts of ppl which the user is following

    data.then((data) => {
        dispatch({
            type: GET,
            payload: data
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })
}

//myposts will be 'spliced' in response to a post id deletion: server response isn't awaited (remove immediately from state while server executes api request)
export const delPost = (id) => (dispatch) => {
    const delpostid = this.PostGet.safePost(domain + '/posts/delete/' + id.toString());

    delpostid.then((delpostid) => {
        dispatch({
            type: DEL_POST,
            payload: delpostid
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })
}

export const newPost = (link) => (dispatch) => {
    //dipatching another action
    dispatch({
        type: POSTING,
        payload: true
    })

    //fetching data
    const newpost = this.PostGet.postItem(domain + '/posts/post', link);

    newpost.then((newpost) => {
        dispatch({
            type: NEW_POST,
            payload: newpost
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })
}

