import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    vehicle_no: "",
    tyre_no: "",
    wear_defects: "",
    status: "",
    delay_days: "",
    ageing: "",
    report_type: "tyre"
  },
};

const filterSlice = createSlice({
    name: "inspectionFilter",
    initialState,
    reducers: {
      setTyreWearFormData: (state, action) => {
        // Merge the current state with the updated field(s)    
        state.formData = { ...state.formData, ...action.payload };
      
      },
      resetTyreWearFormData: (state) => {
        state.formData = initialState.formData;
      },
    },  
});
  
export const { setTyreWearFormData, resetTyreWearFormData } = filterSlice.actions;
  
export default filterSlice.reducer;

