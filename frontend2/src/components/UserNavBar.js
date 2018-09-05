import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { followUser, unfollowUser, getMyFollowing } from '../actions/followActions'
import { getPosts } from '../actions/postGetActions';
import PostGet from '../network/PostGet'
import AuthService from '../network/AuthService'

class UserNavBar extends Component {
    constructor(props) {
        super(props);

        this.AuthService = new AuthService();
        this.PostGet = new PostGet();
        this.domain = 'http://localhost:5000';

        this.state = {
            follow_error: false,
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.error === true)
            //triggering re-render with an error
            this.setState({
                follow_error: true
            })

        if (nextProps.myfollowing !== this.props.myfollowing) {
            const i = nextProps.myfollowing.indexOf(this.props.id);
            const following = (i > -1);

            this.setState({
                following: following
            })

        }
    }

    //wrapper fn
    follow = async () => {
        await this.props.followUser(this.props.id);
    }

    //wrapper fn
    unfollow = async () => {
        await this.props.unfollowUser(this.props.id);
    }

    render() {

        return (
            <div className="UserNavBar">

                {this.state.follow_error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.props.errormsg}
                    </div>) : null}

                <div className="Navigation">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div><Link to="/">Back</Link></div>
                        <a className="navbar-brand" href="">
                            <img src="./img/N_letter.jpg" width="5" height="5" className="d-inline-block align-top" alt="" />
                            {this.props.Name}</a>
                        <FollowButton auth={this.auth} following={this.state.following} follow={this.follow} unfollow={this.unfollow} />
                    </nav>
                </div>

            </div>
        );
    }


}

UserNavBar.propTypes = {
    error: PropTypes.bool,
    errormsg: PropTypes.string,
    myfollowing: PropTypes.array.isRequired,

    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
    getMyFollowing: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    error: state.follow.error,
    errormsg: state.follow.errormsg,
    myfollowing: state.follow.myfollowing,
});

export default connect(mapStateToProps, { followUser, unfollowUser, getMyFollowing, getPosts })(UserNavBar);


//button component---------------------------
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



