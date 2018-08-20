import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Posts from './components/Posts';
import PostLinkForm from './components/PostLinkForm';
import AuthService from './network/AuthService'
import { Redirect } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  render() {

    if (this.Auth.loggedIn()) {
      return (
        <div className="App">
          <Navigation />
          <Posts url={this.props.match.url} />
          <PostLinkForm />
        </div>
        //<Posts userid={this.props.match.params.id} />
      );
    }
    //else redirect to signup page
    else { return (<Redirect to='/signup' />) } //<SignUpForm />
  }
}

export default App;
