import axios from 'axios';
import { API_BASE_URL, API_GENRES, KEY, SEARCH } from '../keys';

export default {
  getGenresMovies: async () => {
    let res = await axios.get(`${API_GENRES}?api_key=${KEY}&language=pt`);
    return res.data;
  },
  getGenresMoviesList: async (id: number, page: number) => {
    let res = await axios.get(
      `${API_BASE_URL}discover/movie?api_key=${KEY}&with_genres=${id}&page=${page}&sort_by=popularity.desc&language=pt`
    );
    return res.data;
  },
  getSearchedMovie: async (movie: string, page: number) => {
    let res = await axios.get(
      `${SEARCH}?api_key=${KEY}&query=${movie}&page=${page}&sort_by=vote_average.desc&language=pt`
    );
    console.log(res.data);
    return res.data;
  },
};
