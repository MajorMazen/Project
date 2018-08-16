import React, { Component } from 'react';
import PostLinkForm from './PostLinkForm'
import PostGet from '../network/PostGet'
import AuthService from '../network/AuthService'
import { Redirect } from 'react-router-dom'

class Posts extends Component {
    //check for logged in users, instantiate public variable Auth
    constructor(props) {
        super(props);

        this.Auth = new AuthService();
        this.PostGet = new PostGet();

        this.state = {
            posts: []
        }
    }


    //re-run each time module is loaded
    async componentDidMount() {
        // this.getpost(this.props.url);
        const data = await this.PostGet.safeGet(this.props.url);

        this.setState({
            posts: data
        })

    }

    //render fn
    render() {

        //view dashboard for loggedin users
        //enable if signup/sign in works
        //if (this.Auth.loggedIn()) {
        if (true) {
            const postItems = this.state.posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ));

            return (
                //dummy
                // <div className="Posts">
                // <Category>
                //    <Sports value="blabla" />
                //   <Politics value="blabla" />
                //    <Science value="blabla" />
                //  </Category>
                //  <PostLinkForm />
                // </div>
                <div className="Posts">
                    {postItems}
                    <PostLinkForm />
                </div>
            );
        }
        //else redirect to signup page
        else { return (<Redirect to='/signup' />) } //<SignUpForm />
    }
}

/*
const Category = props => {
    return <div>{props.children}</div>;
};
const Sports = props => {
    return <div> Sports{props.value}</div>;
};
const Politics = props => {
    return <div> Politics{props.value}</div>;
};
const Science = props => {
    return <div> Science{props.value}</div>;
};
*/

export default Posts;
