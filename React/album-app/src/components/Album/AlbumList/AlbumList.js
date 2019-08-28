import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import Album from '../Album';
import './AlbumList.css';
import Pagination from 'react-js-pagination';

import AlbumService from '../../../services/AlbumService';

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      albums: null,
      activePage: 1,
      totalItems: null,
      sortingType: 'id'
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    AlbumService.getAllAlbums(this.state.activePage, this.state.sortingType)
      .then(res => {
        this.setState({ totalItems: res.headers['x-total-count'] });
        this.setState({ loading: false });
        this.setState({ albums: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    AlbumService.getAllAlbums(pageNumber, this.state.sortingType)
      .then(res => {
        this.setState({ loading: false });
        this.setState({ albums: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSort(sortValue) {
    this.setState({ activePage: 1 });
    this.setState({ sortingType: sortValue });
    AlbumService.getAllAlbums(1, sortValue)
      .then(res => {
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
            <div
              className='td sortingTitle'
              onClick={() => this.handleSort('title')}
            >
              Title
            </div>
            <div
              className='td sortingTitle'
              onClick={() => this.handleSort('artist')}
            >
              Artist
            </div>
            <div
              className='td sortingTitle'
              onClick={() => this.handleSort('releaseDate')}
            >
              Release date
            </div>
            <div
              className='td sortingTitle'
              onClick={() => this.handleSort('nbTracks')}
            >
              Number of tracks
            </div>
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
