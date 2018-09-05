import React, { Component } from 'react';

class Navbar extends Component {

    render() {
        return (
            <div className="Navigation">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        {/* <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" /> */}
                        News Net</a>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/me">
                                {this.props.Name}</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="" onClick={this.props.logout}>
                                Log Out</a>
                        </li>
                    </ul>

                    <form className="form-inline" >
                        <input className="form-control" type="search" name="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                </nav>
            </div>
        )
    }
}

export default Navbar;
