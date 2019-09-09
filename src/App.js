import React, { Component } from 'react';

import Main from './components/main.js';
import Header from './components/header.js';
import Footer from './components/footer.js'
import Nav from './components/nav.js'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Nav/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
