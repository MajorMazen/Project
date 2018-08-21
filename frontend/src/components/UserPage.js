import React, { Component } from 'react';
import Posts from './Posts'
import { withRouter } from "react-router-dom";
import PostGet from '../network/PostGet'

class UserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            //followed: false
        }
        this.PostGet = new PostGet();
        //check if not me!
        this.id = this.props.match.params.id;
    }

    async componentWillMount() {
        //if already been followed, disable button
        const following = await this.PostGet.safeGet('http://localhost:5000/users/following/' + this.id);

        const followed = (following.message === "true");

        this.setState({
            followed: followed
        })
    }

    shouldComponentUpdate() {
        return true
    }

    followUser = () => {
        try {
            this.PostGet.safePost('http://localhost:5000/users/follow/' + this.id);
            this.setState({
                success: true,
                followed: true
            })
        }
        catch (e) {
            this.setState({
                success: false,
            })
        }

    }

    render() {
        return (
            <div className="UserPage">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="">
                        <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" />
                        User Name</a>
                    <button className="btn btn-primary" type="submit" disabled={this.state.followed} onClick={this.followUser}>Follow User</button>
                </nav>

                <Posts url='/' />

            </div>

        )
    }
}

export default withRouter(UserPage);
