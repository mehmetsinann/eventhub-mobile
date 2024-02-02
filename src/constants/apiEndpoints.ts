import {Platform} from 'react-native';

const platformURL = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
export const BASE_URL = `http://${platformURL}:3000/eventhub/api`;
export const GET_ALL_EVENTS_ENDPOINT = '/events';
export const SEARCH_ENDPOINT = '/events/search';
export const CATEGORIES_ENDPOINT = '/events/categories';
