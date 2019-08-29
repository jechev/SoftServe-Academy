import React, { Component } from 'react';
import AlbumService from '../../../services/AlbumService';
import './AlbumDetail.css';

import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import EditAlbum from '../EditAlbum/EditAlbum';

class AlbumDetail extends Component {
  state = { album: {}, isEditable: false };

  constructor(props) {
    super(props);
    this.handleDeleteAlbum = this.handleDeleteAlbum.bind(this);
    this.handleEditAlbum = this.handleEditAlbum.bind(this);
    this.takeEditAlbum = this.takeEditAlbum.bind(this);
  }

  componentDidMount() {
    const albumId = this.props.match.params.id;

    AlbumService.getAlbumById(albumId)
      .then(res => {
        this.setState({ album: res.data });
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
  handleEditAlbum() {
    this.setState({ isEditable: true });
  }
  takeEditAlbum(editedAlbum) {
    this.setState({ album: { ...editedAlbum }, isEditable: false });
  }

  render() {
    let album = (
      <div className='album-container'>
        <img src={this.state.album.picture} alt='cover' />
        <span className='album-info'>
          Title: <strong>{this.state.album.title}</strong>
        </span>
        <span className='album-info'>
          Artist: <strong>{this.state.album.artist}</strong>
        </span>
        <span className='album-info'>
          Number of tracks: <strong>{this.state.album.nbTracks}</strong>
        </span>
        <span className='album-info'>
          Release date: {new Date(this.state.album.releaseDate).toDateString()}
        </span>
        <button
          className='myButton'
          onClick={() => this.handleClickForSpotify(this.state.album.albumLink)}
        >
          Listen in spotify
        </button>
        <div>
          <button className='delete-album' onClick={this.handleDeleteAlbum}>
            Delete the album
          </button>
          <button className='edit-album' onClick={this.handleEditAlbum}>
            Edit the album
          </button>
        </div>
      </div>
    );
    if (this.state.isEditable) {
      album = (
        <EditAlbum
          takeEditAlbum={this.takeEditAlbum}
          album={this.state.album}
        />
      );
    }
    return (
      <div>
        <main>{album}</main>
      </div>
    );
  }
}

export default AlbumDetail;
