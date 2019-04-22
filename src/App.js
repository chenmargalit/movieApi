import React, { Component } from 'react';

import FetchMovies from './components/fetchMovies/fetchMovies';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1 style={{ textAlign: 'center', margin: 20 }}>Movie search API</h1>
        <FetchMovies />
      </div>
    );
  }
}

export default App;
