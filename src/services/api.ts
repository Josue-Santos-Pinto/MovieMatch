import axios from 'axios';
import { API_BASE_URL, API_GENRES, API_URL, KEY } from '../keys';

export default {
  getMovies: async () => {
    let res = await axios.get(`${API_URL}popular?api_key=${KEY}`);
    return res.data;
  },
  getTopMovies: async (page: number) => {
    let res = await axios.get(`${API_URL}top_rated?api_key=${KEY}&page=${page}&language=pt`);
    return res.data;
  },
  getGenresMovies: async () => {
    let res = await axios.get(`${API_GENRES}?api_key=${KEY}&language=pt`);
    return res.data;
  },
  getGenresMoviesList: async (id: number, page: number) => {
    let res = await axios.get(
      `${API_BASE_URL}discover/movie?api_key=${KEY}&with_genres=${id}&page=${page}&language=pt`
    );
    return res.data;
  },
};
