// store.ts
import {configureStore} from '@reduxjs/toolkit';
import eventReducer, {EventsState} from './slices/eventSlice';

interface RootState {
  events: EventsState;
}

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export default store;
export type {RootState};
