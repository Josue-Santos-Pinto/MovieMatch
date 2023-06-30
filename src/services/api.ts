import axios from 'axios';
import { API_BASE_URL, API_GENRES, KEY, SEARCH } from '../keys';

export default {
  getTrendindMovies: async () => {
    let res = await axios.get(
      `${API_BASE_URL}/movie/popular?api_key=${KEY}&language=pt&with_original_language=en`
    );
    return res.data;
  },

  getSearchedMovie: async (movie: string) => {
    let res = await axios.get(
      `${SEARCH}?api_key=${KEY}&query=${movie}&page=1&sort_by=vote_average.desc&language=pt-BR&with_original_language=en`
    );
    return res.data;
  },
  getMovieDetail: async (id: number) => {
    let res = await axios.get(`${API_BASE_URL}/movie/${id}?api_key=${KEY}&language=pt-BR`);
    console.log(res.data);
    return res.data;
  },
  getRelatedMovie: async (id: number) => {
    let res = await axios.get(
      `${API_BASE_URL}/movie/${id}/similar?api_key=${KEY}&language=pt-BR&page=1`
    );
    return res.data;
  },
  getMovieImage: async (id: number) => {
    let res = await axios.get(`${API_BASE_URL}/movie/${id}/images?api_key=${KEY}&language=pt-BR`);
    return res.data;
  },
  getRandomMovie: async (page: number) => {
    let res = await axios.get(
      `${API_BASE_URL}/discover/movie?api_key=${KEY}&sort_by=popularity.desc&page=${page}&language=pt-BR&with_original_language=en`
    );
    return res.data.results;
  },
  getProviders: async (id: number) => {
    let res = await axios.get(
      `${API_BASE_URL}/movie/${id}/watch/providers?api_key=${KEY}&language=pt-BR`
    );
    return res.data;
  },
  getFindMovies: async (page: number) => {
    let res = await axios.get(
      `${API_BASE_URL}/discover/movie?api_key=${KEY}&language=pt-BR&page=${page}&sort_by=vote_count.desc&with_original_language=en`
    );
    return res.data;
  },
  getDocumentaryMovies: async (page: number) => {
    let res = await axios.get(
      `${API_BASE_URL}/discover/movie?api_key=${KEY}&with_genres=99&language=pt-BR&page=${page}&sort_by=vote_count.desc&with_original_language=en`
    );
    return res.data;
  },
  getTvSeries: async (page: number) => {
    let res = await axios.get(
      `${API_BASE_URL}/tv/popular?api_key=${KEY}&language=pt-BR&page=${page}&with_original_language=en`
    );
    return res.data;
  },
};
