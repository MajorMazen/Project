import React, { Component } from 'react';
import PostItem from './PostItem'
import PostGet from '../network/PostGet'
import PropTypes from 'prop-types'
import AuthService from '../network/AuthService'

//Fetching posts - arbitrary url in the property
//redux connection not needed
class PostsOfLink extends Component {

    constructor(props) {
        super(props);

        this.AuthService = new AuthService;
        this.PostGet = new PostGet();
        this.domain = 'http://localhost:5000/posts';
        const dat = this.AuthService.getUserInfo(); //what if it returns null

        this.state = {
            error: false,
            errormsg: "",
            posts: [],
            id: dat.id
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    //fetch data
    componentDidMount = async () => {
        try {
            const data = await this.PostGet.safeGet(this.domain + this.props.url);//like /topic/ or /user/

            this.setState({
                error: false,
                posts: data
            })
        }
        catch (e) {
            this.setState({
                error: true,
                errormsg: "Fetch error"
            })
        }

    }


    render() {

        if (this.state.posts.length > 0) {
            const postItems = this.state.posts.map(post => (
                <PostItem post={post} key={post._id} delete={(post.userid === this.state.id)} />
            ));

            return (
                <div className="PostsOfLink">
                    {this.state.error ? (
                        <div className="alert alert-danger" role="alert">
                            {this.state.errormsg}
                        </div>) : null}
                    {postItems}
                </div>
            )
        }

        else {
            return (<div className="PostsOfLink">
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.errormsg}
                    </div>) : null}
            </div>)
        }
    }
}

export default PostsOfLink;

