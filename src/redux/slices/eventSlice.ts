// eventSlice.ts
import axios from 'axios';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

import {EVENTS_ENDPOINT} from '../../constants/apiEndpoints';
import {Event} from '../../types/Event';

export interface EventsState {
  events: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Create an asynchronous thunk for fetching events with optional search
export const fetchEvents = createAsyncThunk<Event[], string | undefined>(
  'events/fetchEvents',
  async () => {
    const response = await axios.get<Event[]>(`${EVENTS_ENDPOINT}`);
    return response.data;
  },
);

// Create a slice
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
        // Update the payload type
        state.status = 'failed';
        state.error = action.payload as string; // Cast the payload to string
      });
  },
});

// Export the asynchronous thunk and reducer
export default eventSlice.reducer;
