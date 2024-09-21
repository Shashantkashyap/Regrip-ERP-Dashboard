// Redux Slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tableFilter: {}, // Initialize as an empty object
};

const tableFilterSlice = createSlice({
  name: 'tableFilter',
  initialState,
  reducers: {
    setTableFilter: (state, action) => {
      const { key, value } = action.payload;
      state.tableFilter = { [key]: value }; // Create a new object with just the key-value pair
    },
    clearTableFilter: (state) => {
      state.tableFilter = {}; // Clear the filter object
    },
  },
});

// Exporting selectors
export const selectIsFilterEmpty = (state) => {
    // Ensure that state.tableFilter exists and is an object
    if (!state.tableFilter || !state.tableFilter.tableFilter) {
      return true; // If no filter exists, consider it empty
    }
    
    // Check if the filter object has any keys
    return Object.keys(state.tableFilter.tableFilter).length === 0;
  };
export const { setTableFilter, clearTableFilter } = tableFilterSlice.actions;

export default tableFilterSlice.reducer;
