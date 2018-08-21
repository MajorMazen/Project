import React, { Component } from 'react';
import PostGet from '../network/PostGet'

class Posts extends Component {
    //check for logged in users, instantiate public variable Auth
    constructor(props) {
        super(props);

        this.PostGet = new PostGet();

        //properly set state with posts of following ids
        this.state = {
            posts: [],
            success: false
        }
    }

    //re-run each time module is loaded
    async componentWillMount() {
        try {
            const data = await this.PostGet.safeGet('http://localhost:5000' + this.props.url);

            this.setState({
                posts: data.data,//defined as data inside data
                success: true
            })

        }
        catch (e) {
            this.setState({
                success: false //print problem
            })
        }
    }

    //automatically re-renders once component state is changed
    shouldComponentUpdate() {
        return true
    }

    //render fn
    render() {

        if (this.state.success) {
            const postItems = this.state.posts.map(post => (
                <div key={post.name}>
                    <h3>{post.Profession}</h3>
                    <p>{post.location}</p>
                </div>
            ));

            return (
                <div className="Posts">
                    {postItems}
                </div>
            )
        }

        else {
            return (<div className="Posts">
                No Posts to display</div>)
        }
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
