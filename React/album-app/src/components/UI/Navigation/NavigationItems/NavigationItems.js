import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className='NavigationItems'>
    <NavigationItem link='/'>Albums</NavigationItem>
    <NavigationItem link='/orders'>Add Album</NavigationItem>
  </ul>
);

export default navigationItems;
