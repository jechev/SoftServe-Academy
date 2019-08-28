import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import AlbumList from './components/Album/AlbumList/AlbumList';
import Toolbar from './components/UI/Navigation/Toolbar/Toolbar';
import AddAlbum from './components/Album/AddAlbum/AddAlbum';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Toolbar />
        <Route path='/' exact component={AlbumList} />
        <Route path='/addAlbum' component={AddAlbum} />
      </div>
    );
  }
}

export default App;
