// store.ts
import {configureStore} from '@reduxjs/toolkit';
import eventReducer, {EventsState} from './slices/eventSlice';
import filterReducer, {FilterState} from './slices/filterSlice';

interface RootState {
  events: EventsState;
  filter: FilterState;
}

const store = configureStore({
  reducer: {
    events: eventReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type {RootState};
