import PostGet from '../network/PostGet';
import { FOLLOW_USER, UNFOLLOW_USER, GET_MY_FOLLOWING, ERROR } from './types';

const domain = 'http://localhost:5000'; //server domain

//this calls in class PostGet (Generic class for making API requests)
this.PostGet = new PostGet();

//if follow/unfollow is on same page, posts are 'unshifted' or 'spliced' in response, also myfollowing (re-render)
//the component is on a separate page and will mount anyways, so the data will be reloaded from server
export const followUser = (id) => (dispatch) => {
    const myfollowing = this.PostGet.safeGet(domain + '/users/follow/' + id);

    myfollowing.then((myfollowing) => {
        dispatch({
            type: FOLLOW_USER,
            payload: myfollowing
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })
}

export const unfollowUser = (id) => (dispatch) => {
    const myfollowing = this.PostGet.safeGet(domain + '/users/unfollow/' + id);

    myfollowing.then((myfollowing) => {
        dispatch({
            type: UNFOLLOW_USER,
            payload: myfollowing
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })
}

export const getMyFollowing = () => (dispatch) => {
    const myfollowing = this.PostGet.safeGet(domain + '/users/myfollowing');

    myfollowing.then((myfollowing) => {
        dispatch({
            type: GET_MY_FOLLOWING,
            payload: myfollowing
        })
    }).catch((e) => {
        dispatch({
            type: ERROR,
            payload: e
        })
    })
}