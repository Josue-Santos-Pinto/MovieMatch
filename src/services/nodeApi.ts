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
};
