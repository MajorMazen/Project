import React, { Component } from 'react';
import AuthService from '../network/AuthService'
import { withRouter } from "react-router-dom";

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthService();
    }

    logOut = () => {
        this.Auth.logout();
        this.props.history.push("/login");
    }

    searchUser = (e) => {
        //prevent default bootstrap event handlers
        e.preventDefault();
        this.props.history.push("/search/" + e.name);
    }

    render() {
        return (
            <div className="Navigation">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" />
                        News Net</a>
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a className="nav-link" href="/user">
                                User Profile</a>
                        </li>
                        <li class="nav-item ">
                            <a className="nav-link" href="" onClick={this.logOut}>
                                Log Out</a>
                        </li>
                    </ul>

                    <form className="form-inline" onSubmit={this.searchUser}>
                        <input className="form-control" type="search" name="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>

                </nav>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a className="nav-link" href="/tag/business">
                                Business</a>
                        </li>
                        <li class="nav-item">
                            <a className="nav-link" href="/tag/entertainment">
                                Entertainment</a>
                        </li>
                        <li class="nav-item">
                            <a className="nav-link" href="/tag/politics">
                                Politics</a>
                        </li>
                        <li class="nav-item">
                            <a className="nav-link" href="/tag/sport">
                                Sport</a>
                        </li>
                        <li class="nav-item">
                            <a className="nav-link" href="/tag/technology">
                                Technology</a>
                        </li>
                    </ul>
                </nav>

            </div>

        )
    }
}

export default withRouter(Navigation);
