import axios from 'axios';
import { API_BASE_URL, API_GENRES, KEY, SEARCH } from '../keys';

export default {
  getTrendindMovies: async () => {
    let res = await axios.get(`${API_BASE_URL}/movie/popular?api_key=${KEY}&language=pt`);
    return res.data;
  },
  getGenresMovies: async () => {
    let res = await axios.get(`${API_GENRES}?api_key=${KEY}&language=en`);
    return res.data;
  },
  getGenresMoviesList: async (id: number, page: number) => {
    let res = await axios.get(
      `${API_BASE_URL}discover/movie?api_key=${KEY}&with_genres=${id}&page=${page}&sort_by=popularity.desc&language=en`
    );
    return res.data;
  },
  getSearchedMovie: async (movie: string, page: number) => {
    let res = await axios.get(
      `${SEARCH}?api_key=${KEY}&query=${movie}&page=${page}&sort_by=vote_average.desc&language=en`
    );
    return res.data;
  },
  getMovieDetail: async (id: number) => {
    let res = await axios.get(`${API_BASE_URL}/movie/${id}?api_key=${KEY}&language=pt`);
    return res.data;
  },
  getMovieImage: async (id: number) => {
    let res = await axios.get(`${API_BASE_URL}/movie/${id}/images?api_key=${KEY}&language=pt`);
    return res.data;
  },
  getRandomMovie: async (page: number) => {
    let res = await axios.get(
      `${API_BASE_URL}/discover/movie?api_key=${KEY}&sort_by=popularity.desc&page=${page}&language=pt`
    );
    return res.data.results;
  },
  getProviders: async (id: number) => {
    let res = await axios.get(
      `${API_BASE_URL}/movie/${id}/watch/providers?api_key=${KEY}&language=en`
    );
    return res.data;
  },
};
