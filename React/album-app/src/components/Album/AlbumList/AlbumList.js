import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import Album from '../Album';
import './AlbumList.css';

class AlbumList extends Component {
  state = {
    loading: true,
    albums: null
  };

  componentDidMount() {
    axios
      .get()
      .then(res => {
        this.setState({ loading: false });
        this.setState({ albums: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.albums) {
      let albums = this.state.albums.map(album => {
        return (
          <Album
            key={album.id}
            title={album.title}
            artist={album.artist}
            releaseDate={album.releaseDate}
            nbTracks={album.nbTracks}
          />
        );
      });
      return (
        <div className='table'>
          <div className='tr th'>
            <div className='td'>Title</div>
            <div className='td'>Artist</div>
            <div className='td'>Release date</div>
            <div className='td'>Number of tracks</div>
            <div className='td'>Go to Album</div>
          </div>
          {albums}
        </div>
      );
    } else {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
  }
}

export default AlbumList;
