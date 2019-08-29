import React from 'react';
import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
const toolbar = () => (
  <header className='toolbar'>
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
