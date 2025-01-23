import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/', // Base API URL
  timeout: 10000, // Optional: Set a timeout
});

export default axiosInstance;
