import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-44bfe.firebaseio.com/'
});

export default instance;
