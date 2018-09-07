import React, { Component } from 'react';
import './App.css';
import Posts from './Posts';
import PostLinkForm from './PostLinkForm'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AuthService from '../network/AuthService'
import { getUserInfo, logout } from '../actions/authActions'
import NavBar from './NavBar'
import MyPosts from './MyPosts'

class App extends Component {
    constructor(props) {
        super(props);
        this.AuthService = new AuthService();//initializing class
    }


    //conditional rendering here: can't wait for actions' dispatch or next props, render will have already happened
    //call prerequisite method AuthService.loggedIn() at render start
    //following a successful login/signup re-direct, {this.props.name} is populated from state tree, however on refresh, reload from local storage
    render() {
        if (this.AuthService.loggedIn()) {
            this.props.getUserInfo();

            //home page (binded to posts)
            if (this.props.match.url === "/home") {
                return (
                    <div className="App">
                        <NavBar Name={this.props.name} logout={this.props.logout} active={["active", "", ""]} />
                        <Posts />
                        <PostLinkForm />
                    </div>
                );
            }

            //my page (binded to myposts, deleting or adding new posts reflect)
            else if (this.props.match.url === "/me") {
                return (
                    <div className="App">
                        <NavBar Name={this.props.name} logout={this.props.logout} active={["", "active", ""]} />
                        <MyPosts />
                        <PostLinkForm />
                    </div>
                );
            }
        }
        else { return (<Redirect to='/login' />) }
    }

}

App.propTypes = {
    name: PropTypes.string.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isauth: PropTypes.bool.isRequired, //not explicitly used but listed for changes sensed to trigger re-render
    id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    name: state.auth.name,
    isauth: state.auth.isauth,
    id: state.auth.id,
});

export default connect(mapStateToProps, { getUserInfo, logout })(App);





