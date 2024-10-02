import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    tyre_no: '',
    tyre_size: '',
    model: '',
    reason: '',
    sortOrder: '',
    sortField: ''
  },
};

export const scrapFilterSlice = createSlice({
    name: 'scrapFilterSlice',
    initialState,
    reducers: {
      setScrapFilterFormData: (state, action) => {
        state.formData = { ...state.formData, ...action.payload };
        // console.log(state.formData);
      },
      resetScrapFilterFormData: (state, action) => {
        state.formData = action.payload;
        // console.log("Reset: ", state.formData);
      },
    },
});
  
export const { setScrapFilterFormData, resetScrapFilterFormData } = scrapFilterSlice.actions;
  
export default scrapFilterSlice.reducer; 
