import {createSlice} from '@reduxjs/toolkit';

export interface FilterState {
  category: string;
  startDate: Date | null;
  endDate: Date | null;
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    category: '',
    startDate: null,
    endDate: null,
  } as FilterState,
  reducers: {
    setFilterCategory(state, action) {
      state.category = action.payload;
    },
    setFilterStartDate(state, action) {
      state.startDate = action.payload;
    },
    setFilterEndDate(state, action) {
      state.endDate = action.payload;
    },
  },
});

export const {setFilterCategory, setFilterStartDate, setFilterEndDate} =
  filterSlice.actions;
export default filterSlice.reducer;
