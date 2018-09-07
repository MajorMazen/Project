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
import Search from './Search'

const Root = ({ store }) => (
    //defining provider and passing in the variable store, which comes as as input to the function root (called in index.js)
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/user/:id" component={UserPage} />
                <Route exact path="/me" component={App} />
                <Route exact path="/signup" component={SignUpForm} />
                <Route exact path="/login" component={SignInForm} />
                <Route exact path="/topic/:name" component={PostsOfLink} />
                <Route exact path="/post/:id" component={PostsOfLink} />
                <Route exact path="/search/:name" component={Search} />
            </Switch>
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root;