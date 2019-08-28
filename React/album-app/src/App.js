import React from 'react';
import './App.css';

import AlbumList from './components/Album/AlbumList/AlbumList';
import Toolbar from './components/UI/Navigation/Toolbar/Toolbar';

function App() {
  return (
    <div className='App'>
      <Toolbar />
      <AlbumList />
    </div>
  );
}

export default App;
