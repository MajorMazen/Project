import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import UserPage from './components/UserPage'
import PostItem from './components/PostItem'
import TopicPage from './components/TopicPage'
import SearchResults from './components/SearchResults'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/login" component={SignInForm} />
            <Route exact path="/topic/:id" component={TopicPage} />
            <Route exact path="/user/:id" component={UserPage} />
            <Route exact path="/post/:id" component={PostItem} />
            <Route exact path="/search/:name" component={SearchResults} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
