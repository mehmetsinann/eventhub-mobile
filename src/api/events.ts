import {
  EVENTS_CATEGORIES_ENDPOINT,
  EVENTS_SEARCH_ENDPOINT,
  GET_ALL_EVENTS_ENDPOINT,
} from '../constants/apiEndpoints';
import api from './api';

export const getCategories = async () => {
  try {
    const response = await api.get(EVENTS_CATEGORIES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const searchEvents = async (searchTerm: string) => {
  try {
    const response = await api.get(
      `${EVENTS_SEARCH_ENDPOINT}?query=${searchTerm}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error searching events for '${searchTerm}':`, error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await api.get(GET_ALL_EVENTS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error;
  }
};
