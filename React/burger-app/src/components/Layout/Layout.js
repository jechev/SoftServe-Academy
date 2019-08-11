import React from 'react';
import Auxx from '../../hoc/Auxx';
import './Layout.css';

const layout = props => (
  <Auxx>
    <div>Toolbar</div>
    <main className='Content'>{props.children}</main>
  </Auxx>
);

export default layout;
