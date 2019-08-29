import React, { Component } from 'react';
import './AddAlbum.css';
import AlbumService from '../../../services/AlbumService';
import Spinner from '../../UI/Spinner/Spinner';
import DatePicker from 'react-datepicker';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

class AddAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      releaseDate: new Date(),
      nbTracks: 1,
      albumLink: '',
      picture: '',
      loading: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleInputChange(event) {
    //Check event is Date because datepicker return only value from input field
    if (event instanceof Date) {
      this.setState({ releaseDate: event });
    } else {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
  }

  handleSumbit(event) {
    event.preventDefault();
    let newAlbum = this.state;
    delete newAlbum.loading;
    AlbumService.addNewAlbum(newAlbum)
      .then(res => {
        this.setState({ loading: true });
        toast.notify('You created new album');
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let form = (
      <form onSubmit={this.handleSumbit}>
        <ul className='wrapper'>
          <li className='form-row'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Title'
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </li>
          <li className='form-row'>
            <label htmlFor='artist'>Artist</label>
            <input
              type='text'
              name='artist'
              id='artist'
              placeholder='Artist'
              value={this.state.artist}
              onChange={this.handleInputChange}
            />
          </li>
          <li className='form-row'>
            <label htmlFor='releaseDate'>Release date</label>
            <DatePicker
              selected={this.state.releaseDate}
              onChange={this.handleInputChange}
              id='releaseDate'
              name='realeaseDate'
            />
          </li>
          <li className='form-row'>
            <label htmlFor='nbTracks'>Number of Tracks</label>
            <input
              type='number'
              name='nbTracks'
              id='nbTracks'
              min='1'
              placeholder='Number of tracks'
              value={this.state.nbTracks}
              onChange={this.handleInputChange}
            />
          </li>
          <li className='form-row'>
            <label htmlFor='albumLink'>Album link </label>
            <input
              type='text'
              name='albumLink'
              id='albumLink'
              placeholder='Link to spotify'
              value={this.state.albumLink}
              onChange={this.handleInputChange}
            />
          </li>
          <li className='form-row'>
            <label htmlFor='picture'>Cover link</label>
            <input
              type='text'
              name='picture'
              id='picture'
              placeholder='Link for cover image'
              value={this.state.picture}
              onChange={this.handleInputChange}
            />
          </li>
          <li className='form-row'>
            <button>Add album</button>
          </li>
        </ul>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div>
        <main>
          <h3>Add new album</h3>
          {form}
        </main>
      </div>
    );
  }
}

export default AddAlbum;
