import axios from 'axios';
import {BASE_ENDPOINT} from '../constants/apiEndpoints';

const instance = axios.create({
  baseURL: BASE_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default instance;
