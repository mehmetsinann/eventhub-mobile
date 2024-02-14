// import {Platform} from 'react-native';

// const DEVELOPMENT_URL =
//   Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
const PROD_URL = 'https://eventhub-backend.vercel.app';

export const BASE_ENDPOINT = `${PROD_URL}/eventhub/api`;
export const GET_ALL_EVENTS_ENDPOINT = '/events';
export const EVENTS_SEARCH_ENDPOINT = '/events/search';
export const EVENTS_CATEGORIES_ENDPOINT = '/events/categories';
