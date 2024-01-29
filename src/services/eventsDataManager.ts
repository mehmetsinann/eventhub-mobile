import axios from 'axios';

import {CATEGORIES_ENDPOINT, SEARCH_ENDPOINT} from '../constants/apiEndpoints';

export const getCategories = async () => {
  const response = await axios.get(CATEGORIES_ENDPOINT);
  return response.data;
};

export const searchEvents = async (searchTerm: string) => {
  const response = await axios.get(`${SEARCH_ENDPOINT}?query=${searchTerm}`);
  return response.data;
};
