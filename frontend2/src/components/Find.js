import React, { Component } from 'react';
import PostGet from '../network/PostGet'
import { Link } from 'react-router-dom'
import userimg from '../img/user.jpg'


class Find extends Component {

    constructor(props) {
        super(props);

        this.PostGet = new PostGet();
        this.domain = 'http://localhost:5000/users';

        //set to router link if no props are passed through another component
        let url;
        if (!this.props.url) { url = this.props.match.url; }
        else url = this.props.url;

        this.state = {
            error: false,
            errormsg: "",
            users: [],
            url: url,
            done: false
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    //fetch data
    componentWillMount = async () => {
        this.setState({
            done: false
        })
        try {
            const data = await this.PostGet.safeGet(this.domain + this.state.url);
            this.setState({
                error: false,
                users: data,
                done: true
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
                    <a href={"/user/" + user._id} >
                        <div style={{ fontSize: "30px" }}>
                            <img src={userimg} alt="user" style={{ width: "60px", height: "60px" }} /> {user.name} </div></a>
                    <br />
                </div>
            ));

            return (
                <div className="Find">
                    {this.state.error ? (
                        <div className="alert alert-danger" role="alert">
                            {this.state.errormsg}
                        </div>) : null}

                    <div className="Navigation">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div><Link to="/home">Back to Home</Link></div>
                        </nav>
                    </div>

                    {users}
                </div>
            )
        }

        else if (this.state.done) {
            return (
                <div className="Find" style={{ fontSize: "20px" }}>
                    <div className="Navigation">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div><Link to="/home">Back to Home</Link></div>
                        </nav>
                    </div>
                    Opss...None...
            </div>
            )

        }

        else {
            return (<div className="Find">
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.errormsg}
                    </div>) : null}

            </div>)
        }
    }
}

export default Find;



