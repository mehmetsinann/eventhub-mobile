// eventSlice.ts
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

import {Event} from '../../types/Event';
import {getAllEvents} from '../../api/events';

export interface EventsState {
  events: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchEvents = createAsyncThunk<Event[], string | undefined>(
  'events/fetchEvents',
  getAllEvents,
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle',
    error: null,
  } as EventsState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.status = 'succeeded';
          state.events = action.payload;
        },
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default eventSlice.reducer;
