import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    vehicle_no:"",
    //trailor_no: '',
    start_date: '',
    end_date: '',
    manufacturer_year: '',
    manufacturer_name: '',
  },
};

const filterSlice = createSlice({
  name: 'masterFilter',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { setFormData, resetFormData } = filterSlice.actions;

export default filterSlice.reducer;
