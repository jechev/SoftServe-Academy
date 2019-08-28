import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import Album from '../Album';
import './AlbumList.css';
import Pagination from 'react-js-pagination';

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      albums: null,
      activePage: 1,
      totalItems: null
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        'http://localhost:3000/albums?_page=' +
          this.state.activePage +
          '&_limit=5'
      )
      .then(res => {
        console.log(res);
        this.setState({ totalItems: res.headers['x-total-count'] });
        this.setState({ loading: false });
        this.setState({ albums: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    axios
      .get('http://localhost:3000/albums?_page=' + pageNumber + '&_limit=5')
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
        this.setState({ albums: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const that = this;
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
          <div className='paginationContainer'>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={5}
              totalItemsCount={this.state.totalItems}
              pageRangeDisplayed={5}
              onChange={that.handlePageChange}
            />
          </div>
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
