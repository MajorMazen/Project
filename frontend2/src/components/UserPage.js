import React, { Component } from 'react';
import PostsOfLink from './PostsOfLink';
import PostGet from '../network/PostGet'
import UserNavBar from './UserNavBar';

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.PostGet = new PostGet();
        this.domain = 'http://localhost:5000';

        this.state = {
            name_error: false,
            name_errormsg: "",
            username: "",
        }
    }


    componentDidMount = async () => {
        try {
            //get user name
            const username = await this.PostGet.safeGet(this.domain + "/users/name/" + this.props.match.params.id);//get user name     
            this.setState({
                name_error: false,
                username: username.name,
            })
        } catch (e) {
            this.setState({
                name_error: true,
                name_errormsg: "Profile fetch error"
            })
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        //needed if user types in the link to user profile instead of press on user name (passing username as a given value)
        if (this.state.name_error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {this.state.name_errormsg}
                </div>
            );
        }

        else {
            return (
                <div className="UserPage">
                    <UserNavBar Name={this.state.username} id={this.props.match.params.id} />
                    <PostsOfLink url={this.props.match.url} />
                </div>
            );
        }
    }

}

export default UserPage;



