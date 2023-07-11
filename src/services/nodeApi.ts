import axios from 'axios';
import { NODE_API } from '../keys';
import qs from 'qs';

export default {
  login: async (email: string, password: string) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const data = {
        email,
        password,
      };

      let res = await axios.post(`${NODE_API}/login`, qs.stringify(data), config);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  register: async (name: string, email: string, password: string, password_confirm: string) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const data = {
        name,
        email,
        password,
        password_confirm,
      };

      let res = await axios.post(`${NODE_API}/register`, qs.stringify(data), config);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  getUserInfo: async (id: string, token: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios.get(`${NODE_API}/${id}/user`, config);
      return res.data; // A resposta da API
    } catch (error) {
      console.error(error);
    }
  },
  changeUserInfo: async (id: string, token: string, fData: FormData) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      };

      let res = await axios.put(`${NODE_API}/${id}/user`, fData, config);
      console.log(res.data);
      return res.data; // A resposta da API
    } catch (error) {
      console.error(error);
    }
  },
  getFavMovies: async (id: string, token: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      let res = await axios.get(`${NODE_API}/${id}/favmovies`, config);
      console.log(res.data);
      return res.data; // A resposta da API
    } catch (error) {
      console.error(error);
    }
  },
  postNewFavMovies: async (
    id: string,
    token: string,
    movie_number: string,
    vote_average: number,
    image: string
  ) => {
    try {
      console.log(id, token, movie_number, vote_average, image);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = {
        movie_number,
        vote_average,
        image,
      };

      let res = await axios.post(`${NODE_API}/${id}/favmovie`, qs.stringify(data), config);
      console.log(res.data);
      return res.data; // A resposta da API
    } catch (error) {
      console.error(error);
    }
  },
};
