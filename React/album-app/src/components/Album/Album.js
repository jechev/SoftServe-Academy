import React from 'react';
import './Album.css';

const album = props => (
  <div className='tr'>
    <div className='td'>
      <span>{props.title}</span>
    </div>
    <div className='td'>
      <span>{props.artist}</span>
    </div>
    <div className='td'>
      <span>{new Date(props.releaseDate).toDateString()}</span>
    </div>
    <div className='td'>
      <span>{props.nbTracks}</span>
    </div>
    <div className='td'>
      <span>Go go</span>
    </div>
  </div>
);

export default album;
