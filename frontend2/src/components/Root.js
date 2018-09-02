import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router'
import ReactDOM from 'react-dom';
import App from './App';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
// import PostItem from '.GetPostItem';
import UserPage from './UserPage';
// import MyPage from './MyPage';
//import TopicPage from './TopicPage'
// import SearchResults from './SearchResults';
import registerServiceWorker from '../registerServiceWorker';

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
                {/* <Route exact path="/topic/:id" component={TopicPage} /> */}
                {/* <Route exact path="/post/:id" component={GetPostItem} />
            <Route exact path="/search/:name" component={SearchResults} /> */}
            </Switch>
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root;