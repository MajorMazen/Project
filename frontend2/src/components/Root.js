import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router'
import App from './App';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import UserPage from './UserPage';
import PostsOfLink from './PostsOfLink'
import Find from './Find'
import About from './About'

const Root = ({ store }) => (
    //defining provider and passing in the variable store, which comes as as input to the function root (called in index.js)
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={About} />
                <Route exact path="/home" component={App} />
                <Route exact path="/me" component={App} />
                <Route exact path="/user/:id" component={UserPage} />
                <Route exact path="/signup" component={SignUpForm} />
                <Route exact path="/login" component={SignInForm} />
                <Route exact path="/topic/:name" component={PostsOfLink} />
                <Route exact path="/post/:id" component={PostsOfLink} />
                <Route exact path="/recent" component={PostsOfLink} />
                <Route exact path="/find/:name" component={Find} />
                <Route exact path="/following" component={Find} />
                <Route exact path="/followers" component={Find} />
                <Route exact path="/user/:id/following" component={Find} />
                <Route exact path="/user/:id/followers" component={Find} />
            </Switch>
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root;