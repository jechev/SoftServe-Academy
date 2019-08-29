import React, { Component } from 'react';
import AlbumService from '../../../services/AlbumService';
import './AlbumDetail.css';

import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';

class AlbumDetail extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.handleDeleteAlbum = this.handleDeleteAlbum.bind(this);
  }

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

  handleClickForSpotify(spotifyLink) {
    window.open(spotifyLink, '_blank');
  }

  handleDeleteAlbum() {
    const albumId = this.props.match.params.id;
    let result = window.confirm('Are you sure you want to delete?');
    if (result) {
      AlbumService.deleteAlbum(albumId)
        .then(res => {
          toast.notify('You deleted album', {
            duration: 2000
          });
          this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }
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
              onClick={() => this.handleClickForSpotify(this.state.albumLink)}
            >
              Listen in spotify
            </button>
            <div>
              <button className='delete-album' onClick={this.handleDeleteAlbum}>
                Delete the album
              </button>
              <button className='edit-album'>Edit the album</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default AlbumDetail;
