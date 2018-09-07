import React, { Component } from 'react';
import { withRouter } from 'react-router'
import logo from '../img/logo.jpg'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
    }

    updateVal = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    search = (e) => {
        e.preventDefault();
        if (this.state.search !== "")
            this.props.history.push("/find/" + this.state.search)
    }

    render() {
        return (
            <div className="Navigation">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container w-100">
                        <a className="navbar-brand" href="/">
                            <img src={logo} width="30" height="30" className="d-inline-block align-center" alt="" />
                            News Net</a>
                        <ul className="navbar-nav mr-auto">
                            <li className={"nav-item " + this.props.active[0]}>
                                <a className="nav-link" href="/home" >
                                    My App </a>
                            </li>
                            <li className={"nav-item " + this.props.active[1]}>
                                <a className="nav-link" href="/me" >
                                    My Profile</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/followers">
                                    My Followers</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/following" >
                                    Following</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="" onClick={this.props.logout}>
                                    Log Out</a>
                            </li>
                        </ul>

                        <form className="form-inline" onSubmit={this.search}>
                            <input className="form-control" type="search" name="search" placeholder="Search Users" aria-label="Search" onChange={this.updateVal} />
                            <button className="btn btn-primary" type="submit" >Search</button>
                        </form>
                    </div>
                </nav>
            </div>

        )
    }
}

export default withRouter(Navbar);
