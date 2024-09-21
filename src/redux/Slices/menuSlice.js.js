import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMenuItem: 1,
  activeDropdownItem: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenuItem: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    setActiveDropdownItem: (state, action) => {
      state.activeDropdownItem = action.payload;
    },
  },
});

export const { setActiveMenuItem, setActiveDropdownItem } = menuSlice.actions;

export default menuSlice.reducer;
