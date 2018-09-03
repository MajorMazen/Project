import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostsOfLink from './PostsOfLink';
import { followUser, unfollowUser, getMyFollowing } from '../actions/followActions'
import PostGet from '../network/PostGet'


//will ignore authentication check and just disable follow buttons, if myfollowing doen't exist
class UserPage extends Component {
    constructor(props) {
        super(props);

        this.PostGet = new PostGet();
        this.domain = 'http://localhost:5000/users';

        this.state = {
            follow_error: false,
            name_error: false,
            name_errormsg: "",
            username: "",
            following: false
        }
    }

    componentDidMount = async () => {
        try {
            //get user name
            const username = await this.PostGet.safeGet(this.domain + "/name/" + this.props.match.params.id);//get user name     
            this.setState({
                name_error: false, //name or myfollowing error
                username: username.name
            })
        }
        catch (e) {
            this.setState({
                name_error: true,
                name_errormsg: "Profile fetch error"
            })
        }

        //get my following
        try {
            await this.props.getMyFollowing();
        }
        catch (e) { }
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
            const i = nextProps.myfollowing.indexOf(this.props.match.params.id); //what if myfollowing is empty
            const following = (i > -1);

            this.setState({
                following: following
            })
        }
    }

    //wrapper fn
    follow = async () => {
        await this.props.followUser();
    }
    //wrapper fn
    unfollow = async () => {
        await this.props.unfollowUser();
    }

    render() {
        //get user name first and pass to Name //needed if user types in the link to user profile instead of press on user name
        //fix navbar
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

                    <NavBar Name={this.state.username} following={this.state.following} follow={this.follow} unfollow={this.unfollow} />
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
                <button className="btn btn-primary" type="submit" disabled={props.following} onClick={props.follow}>Follow User</button>
            </nav>
        </div>
    )
}



