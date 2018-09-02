import React, { Component } from 'react';
import AuthService from '../network/AuthService'
import { withRouter } from "react-router-dom";

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.id = this.props.match.params.id;
        var following = (this.props.ids == this.id)//user id is contained in requester following ids
        this.state = {
            following: following,
            success: false,
            posts: [],
            id: []
        }
        this.Auth = new AuthService();
    }

    //--------------------------------------------------------------------------------------------------
    logOut = () => {
        this.Auth.logout();
        //withRouter enables a fn not a component (hasn't this.props) to push routes
        //components otherwise use the package Redirect from react-router-dom
        this.props.history.push("/login");
    }

    //--------------------------------------------------------------------------------------------------
    searchUser = (e) => {
        //prevent default bootstrap event handlers
        e.preventDefault();
        this.props.history.push("/search/" + e.name);
    }

    //--------------------------------------------------------------------------------------------------
    followUser = async () => {
        try {
            await this.PostGet.safePost('http://localhost:5000/users/follow/' + this.id);
            let data = await this.PostGet.safeGet('http://localhost:5000/user/' + this.id);

            this.setState({
                success: true,
                posts: data,
                followed: true,
                id: this.id
            }, function () {
                this.props.followId(this.state.id, this.state.posts); //triggering handleFollowId on App component
            })
        }
        catch (e) {
            this.setState({
                success: false,
            })
        }

    }

    //--------------------------------------------------------------------------------------------------
    render() {
        //home page
        if (mode == "home") {
            return (
                <div className="Navigation">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">
                            <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" />
                            News Net</a>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/me">
                                    My Name</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="" onClick={this.logOut}>
                                    Log Out</a>
                            </li>
                        </ul>

                        <form className="form-inline" onSubmit={this.searchUser}>
                            <input className="form-control" type="search" name="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>

                    </nav>

                </div>

            )
        }

        //user page
        else if (mode == "user") {
            return (
                <div className="Navigation">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href={this.props.url}>
                            <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" />
                            User Name</a>
                        <button className="btn btn-primary" type="submit" disabled={this.state.following} onClick={this.followUser}>Follow User</button>
                    </nav>
                </div>
            )
        }

        else if (mode == "me") {
            return (
                <div className="Navigation">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/me">
                            <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" />
                            My Name</a>
                    </nav>
                </div>
            )
        }

        else if (mode == "topic") {
            return (
                <div className="Navigation">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href={this.props.url}>
                            <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" />
                            Topic Name</a>
                        <button className="btn btn-primary" type="submit" disabled={this.state.following} onClick={this.followTopic}>Follow Topic</button>
                    </nav>
                </div>
            )
        }
    }
}

export default withRouter(Navigation);
