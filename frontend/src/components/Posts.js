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

        if (this.Auth.loggedIn()) {
            const data = await this.PostGet.safeGet('http://localhost:5000/dashboard/' + this.props.match.params.id);

            this.setState({
                posts: data.data//defined as data inside data
            })
        }

    }

    //render fn
    render() {

        //view dashboard for loggedin users
        if (this.Auth.loggedIn()) {
            // if (false) {
            console.log(this.state.posts);
            const postItems = this.state.posts.map(post => (
                <div key={post.name}>
                    <h3>{post.Profession}</h3>
                    <p>{post.location}</p>
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
