import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostsOfLink from './PostsOfLink';
import { followUser, unfollowUser, getMyFollowing } from '../actions/followActions'
import PostGet from '../network/PostGet'
import AuthService from '../network/AuthService'

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.AuthService = new AuthService();
        this.PostGet = new PostGet();
        this.domain = 'http://localhost:5000';

        this.state = {
            follow_error: false,
            name_error: false,
            name_errormsg: "",
            username: "",
            following: false,
        }
    }

    componentWillMount = async () => {
        //get following
        this.auth = this.AuthService.loggedIn();
        if (this.auth) {
            await this.props.getMyFollowing();
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

        }

        catch (e) {
            this.setState({
                name_error: true,
                name_errormsg: "Profile fetch error"
            })
        }
    }

    shouldComponentUpdate() {
        return true;
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.error === true)
            //triggering re-render with an error
            this.setState({
                follow_error: true
            })

        if (nextProps.myfollowing) {
            const i = nextProps.myfollowing.indexOf(this.props.match.params.id);
            const following = (i > -1);

            this.setState({
                following: following
            })
        }
    }

    //wrapper fn
    follow = async () => {
        await this.props.followUser(this.props.match.params.id);
        this.setState({
            following: true
        })
    }
    //wrapper fn
    unfollow = async () => {
        await this.props.unfollowUser(this.props.match.params.id);
        this.setState({
            following: false
        })
    }

    render() {
        //needed if user types in the link to user profile instead of press on user name
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

                    {this.state.follow_error ? (
                        <div className="alert alert-danger" role="alert">
                            {this.props.errormsg}
                        </div>) : null}

                    <NavBar auth={this.auth} Name={this.state.username} following={this.state.following} follow={this.follow} unfollow={this.unfollow} />
                    <PostsOfLink url={this.props.match.url} />
                </div>
            );
        }
    }

}

UserPage.propTypes = {
    error: PropTypes.bool,
    errormsg: PropTypes.string,
    myfollowing: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
    getMyFollowing: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    error: state.follow.error,
    errormsg: state.follow.errormsg,
    myfollowing: state.follow.myfollowing,
    id: state.auth.id
});

export default connect(mapStateToProps, { followUser, unfollowUser, getMyFollowing })(UserPage);

//---------------------------------------------
const NavBar = props => {
    return (
        <div className="Navigation">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="">
                    <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" />
                    {props.Name}</a>
                <FollowButton auth={props.auth} following={props.following} follow={props.follow} unfollow={props.unfollow} />
            </nav>
        </div>
    )
}

const FollowButton = props => {
    if (props.following) {
        return (
            <button className="btn btn-primary" type="submit" onClick={props.unfollow}>Unfollow User</button>
        )
    }
    else {
        return (
            <button className="btn btn-primary" type="submit" onClick={props.follow} disabled={!props.auth} >Follow User</button>
        )
    }

}



