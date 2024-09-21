import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    Vehicle_Number: "",
    Mechanical_Defect: "",
    Status: "",
    Ageing: "",
    Delay: "",
  },
};

const filterSlice = createSlice({
  name: "mechanicalFilter",
  initialState,
  reducers: {
    setMechanicalFormData: (state, action) => {
      // Merge the current state with the updated field(s)
      state.formData = { ...state.formData, ...action.payload };
    },
    resetMechanicalFormData: (state) => {
      state.formData = initialState.formData;
    },
  },  
});

export const { setMechanicalFormData, resetMechanicalFormData } =
  filterSlice.actions;

export default filterSlice.reducer;
