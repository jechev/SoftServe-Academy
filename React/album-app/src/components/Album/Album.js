import React from 'react';
import './Album.css';
import { Link } from 'react-router-dom';

const album = props => (
  <div className='tr'>
    <div className='td'>
      <span>
        <strong>{props.title}</strong>
      </span>
    </div>
    <div className='td'>
      <span>
        <strong>{props.artist}</strong>
      </span>
    </div>
    <div className='td'>
      <span>{new Date(props.releaseDate).toDateString()}</span>
    </div>
    <div className='td'>
      <span>{props.nbTracks}</span>
    </div>
    <div className='td'>
      <span>
        <Link to={`/album/${props.id}`} className='albumButton'>
          Go to album
        </Link>
      </span>
    </div>
  </div>
);

export default album;
