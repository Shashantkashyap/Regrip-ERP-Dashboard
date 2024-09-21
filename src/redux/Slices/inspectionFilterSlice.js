import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    vehicle_no: "",
    start_date: "",
    end_date: "",
    inspectionCount: ""
  },
};

const filterSlice = createSlice({
  name: "inspectionFilter",
  initialState,
  reducers: {
    setInspectionFormData: (state, action) => {
      // Merge the current state with the updated field(s)
      state.formData = { ...state.formData, ...action.payload };
    },
    resetInspectionFormData: (state) => {
      state.formData = initialState.formData;
    },
  },  
});

export const { setInspectionFormData, resetInspectionFormData } =
  filterSlice.actions;

export default filterSlice.reducer;
