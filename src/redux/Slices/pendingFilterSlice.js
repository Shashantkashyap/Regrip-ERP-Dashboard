import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    vehicle_no:"",
    min_inspection_days: '',
    
  },
};

const pendingFilterSlice = createSlice({
  name: 'pendingInspectionFilter',
  initialState,
  reducers: {
    setPendingInspectionFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetPendingInspectionFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { setPendingInspectionFormData, resetPendingInspectionFormData } = pendingFilterSlice.actions;

export default pendingFilterSlice.reducer;
