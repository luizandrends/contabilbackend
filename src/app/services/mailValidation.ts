import axios from 'axios';

const api = axios.create({
  baseURL: 'https://verify-email.org/home/verify-as-guest',
});

export default api;
