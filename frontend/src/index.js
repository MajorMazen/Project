import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import Posts from './components/Posts'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/login" component={SignInForm} />
            <Route exact path="/dashboard/:id" component={Posts} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
