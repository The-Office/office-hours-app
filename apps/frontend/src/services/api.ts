import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.BASE_URL}/api`,
});
export default api;