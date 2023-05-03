import axios from 'axios';
import { API_URL, KEY } from '../keys';

export default {
  getMovies: async () => {
    let res = await axios.get(`${API_URL}popular?api_key=${KEY}`);
    return res.data;
  },
  getTopMovies: async () => {
    let res = await axios.get(`${API_URL}top_rated?api_key=${KEY}`);
    return res.data;
  },
};
