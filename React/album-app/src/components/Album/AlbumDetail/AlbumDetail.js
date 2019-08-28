import React, { Component } from 'react';
import AlbumService from '../../../services/AlbumService';
import './AlbumDetail.css';

class AlbumDetail extends Component {
  state = {};

  componentDidMount() {
    const albumId = this.props.match.params.id;

    AlbumService.getAlbumById(albumId)
      .then(res => {
        this.setState(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClick(spotifyLink) {
    window.open(spotifyLink, '_blank');
  }

  render() {
    return (
      <div>
        <main>
          <div className='album-container'>
            <img src={this.state.picture} alt='cover' />
            <span className='album-info'>
              Title: <strong>{this.state.title}</strong>
            </span>
            <span className='album-info'>
              Artist: <strong>{this.state.artist}</strong>
            </span>
            <span className='album-info'>
              Number of tracks: <strong>{this.state.nbTracks}</strong>
            </span>
            <span className='album-info'>
              Release date: {new Date(this.state.releaseDate).toDateString()}
            </span>
            <button
              className='myButton'
              onClick={() => this.handleClick(this.state.albumLink)}
            >
              Listen in spotify
            </button>
          </div>
        </main>
      </div>
    );
  }
}

export default AlbumDetail;
