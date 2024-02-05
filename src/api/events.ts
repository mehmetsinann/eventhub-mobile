import {
  EVENTS_CATEGORIES_ENDPOINT,
  EVENTS_SEARCH_ENDPOINT,
  GET_ALL_EVENTS_ENDPOINT,
} from '../constants/apiEndpoints';
import api from './api';

export const getCategories = async () => {
  const response = await api.get(EVENTS_CATEGORIES_ENDPOINT);
  return response.data;
};

export const searchEvents = async (searchTerm: string) => {
  const response = await api.get(
    `${EVENTS_SEARCH_ENDPOINT}?query=${searchTerm}`,
  );
  return response.data;
};

export const getAllEvents = async () => {
  const response = await api.get(GET_ALL_EVENTS_ENDPOINT);
  return response.data;
};
