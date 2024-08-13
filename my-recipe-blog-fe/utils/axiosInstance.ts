import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log('Token retrieved:', token); 
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('No token found in localStorage');
      }
    }
    console.log('Request Headers:', config.headers); 
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
