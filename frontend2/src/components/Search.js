import React, { Component } from 'react';
import PostGet from '../network/PostGet'
import { Link } from 'react-router-dom'


class Search extends Component {

    constructor(props) {
        super(props);

        this.PostGet = new PostGet();
        this.domain = 'http://localhost:5000/users';

        this.state = {
            error: false,
            errormsg: "",
            users: [],
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    //fetch data
    componentDidMount = async () => {
        try {
            const data = await this.PostGet.safeGet(this.domain + this.props.match.url);
            this.setState({
                error: false,
                users: data
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
        if (this.state.users.length > 0) {
            const users = this.state.users.map(user => (
                <div key={user._id} >
                    <a href={"/user/" + user._id} > {user.name} </a>
                    <br />
                </div>
            ));

            return (
                <div className="Search">
                    {this.state.error ? (
                        <div className="alert alert-danger" role="alert">
                            {this.state.errormsg}
                        </div>) : null}

                    <div className="Navigation">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div><Link to="/">Back to Home</Link></div>
                        </nav>
                    </div>

                    {users}
                </div>
            )
        }

        else {
            return (<div className="Search">
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.errormsg}
                    </div>) : null}

            </div>)
        }
    }
}

export default Search;



