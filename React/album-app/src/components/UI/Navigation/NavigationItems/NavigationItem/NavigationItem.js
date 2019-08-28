import React from 'react';
// import { NavLink } from 'react-router-dom';
import './NavigationItem.css';

const navigationItem = props => (
  <li className='NavigationItem'>
    <a to={props.link} activeClassName='active' exact>
      {props.children}
    </a>
  </li>
);

export default navigationItem;
