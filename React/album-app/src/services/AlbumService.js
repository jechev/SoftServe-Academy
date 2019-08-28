import axios from 'axios';

export default {
  getAllAlbums(page, sort) {
    return axios.get(
      'http://localhost:3000/albums?_page=' + page + '&_limit=5&_sort=' + sort
    );
  }
};
