import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.intelli-secure.tom-fourcaudot.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;