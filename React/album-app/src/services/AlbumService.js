import axios from 'axios';
const baseUrl = 'http://localhost:3000/albums';
export default {
  getAllAlbums(page, sort) {
    return axios.get(baseUrl + '?_page=' + page + '&_limit=5&_sort=' + sort);
  },
  addNewAlbum(album) {
    return axios.post(baseUrl, album);
  },
  getAlbumById(albumId) {
    return axios.get(baseUrl + '/' + albumId);
  },
  deleteAlbum(albumId) {
    return axios.delete(baseUrl + '/' + albumId);
  }
};
