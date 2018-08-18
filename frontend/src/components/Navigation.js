import React, { Component } from 'react';
import Posts from './Posts'
import AuthService from '../network/AuthService'
import { Link, withRouter } from "react-router-dom";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
    }

    logOut = () => {
        this.Auth.logout();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="Navigation">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{
                    display: 'flex', justifyContent: 'space-between'
                }}>

                    <div style={{
                        float: 'left'
                    }}>

                        <a className="navbar-brand" href="#">
                            <img src="./img/N_letter.jpg" width="30" height="30" className="d-inline-block align-top" alt="" />
                            News Net
                        </a>
                        <a className="nav-item mr-3" href="#">
                            User Profile
                        </a>
                        <a className="nav-item" href="/dashboard/01227469070">
                            Dashboard
                        </a>
                    </div>

                    <div style={{
                        float: 'right'
                    }}>

                        <form className="form-inline">
                            <a className="nav-item mr-3" href="#" onClick={this.logOut}>
                                Log Out
                            </a>
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>

                    </div>

                </nav>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100" style={{
                    display: 'flex', justifyContent: 'space-between'
                }}>
                    <a className="nav-item" href="#">
                        Business
              </a>
                    <a className="nav-item" href="#">
                        Entertainment
              </a>
                    <a className="nav-item" href="#">
                        Politics
              </a>
                    <a className="nav-item" href="#">
                        Sport
              </a>
                    <a className="nav-item" href="#">
                        Technology
              </a>
                </nav>


            </div>

        )
    }
}

export default withRouter(Navigation);
