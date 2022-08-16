import axios from 'axios';

const baseURL = __DEV__
  ? 'http://localhost:1337'
  : 'https://articles.serverhost.com';

console.log(baseURL);

const client = axios.create({ baseURL });

export default client;
