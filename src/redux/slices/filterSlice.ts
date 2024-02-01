import {createSlice} from '@reduxjs/toolkit';

export interface FilterState {
  category: string;
  orderBy: string;
  eventType: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    category: '',
    orderBy: 'date',
    eventType: null,
    startDate: null,
    endDate: null,
  } as FilterState,
  reducers: {
    setFilterCategory(state, action) {
      state.category = action.payload;
    },
    setFilterOrderBy(state, action) {
      state.orderBy = action.payload;
    },
    setFilterEventType(state, action) {
      state.eventType = action.payload;
    },
    setFilterStartDate(state, action) {
      state.startDate = action.payload;
    },
    setFilterEndDate(state, action) {
      state.endDate = action.payload;
    },
  },
});

export const {
  setFilterCategory,
  setFilterOrderBy,
  setFilterEventType,
  setFilterStartDate,
  setFilterEndDate,
} = filterSlice.actions;
export default filterSlice.reducer;
