import axios from 'axios';
import {BASE_URL} from '../constants/apiEndpoints';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default instance;
