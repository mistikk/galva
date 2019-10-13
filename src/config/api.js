import axios from 'axios';

const api = axios.create({
  baseURL: 'http://webservis.galvametal.com.tr:81/rest/rs/restService/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
