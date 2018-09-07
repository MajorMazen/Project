import React, { Component } from 'react';
import { withRouter } from 'react-router'

class Navbar extends Component {

    updateVal = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    search = (e) => {
        e.preventDefault();
        this.props.history.push("/search/" + this.state.search)
    }

    render() {
        return (
            <div className="Navigation">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        {/* <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" /> */}
                        News Net</a>
                    <ul className="navbar-nav mr-auto">
                        <li className={"nav-item " + this.props.active[0]}>
                            <a className="nav-link" href="/" >
                                Home </a>
                        </li>
                        <li className={"nav-item " + this.props.active[1]}>
                            <a className="nav-link" href="/me" >
                                {this.props.Name + " Profile"}</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="" onClick={this.props.logout}>
                                Log Out</a>
                        </li>
                    </ul>

                    <form className="form-inline" onSubmit={this.search}>
                        <input className="form-control" type="search" name="search" placeholder="Find User" aria-label="Search" onChange={this.updateVal} />
                        <button className="btn btn-primary" type="submit" >Search</button>
                    </form>
                </nav>
            </div>
        )
    }
}

export default withRouter(Navbar);
