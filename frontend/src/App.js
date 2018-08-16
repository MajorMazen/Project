import React, { Component } from 'react';
import Posts from './components/Posts'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Posts url="https://jsonplaceholder.typicode.com/posts" />
      </div>
    );
  }
}

export default App;
