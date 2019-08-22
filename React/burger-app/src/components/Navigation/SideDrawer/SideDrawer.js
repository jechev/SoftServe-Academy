import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxx from '../../../hoc/Auxx';
import './SideDrawer.css';

const sideDrawer = props => {
  let attachedClasses = 'SideDrawer Close';
  if (props.open) {
    attachedClasses = 'SideDrawer Open';
  }
  return (
    <Auxx>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses}>
        <Logo height={'11%'} />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxx>
  );
};

export default sideDrawer;
