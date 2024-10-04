import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    company_name: "",
    city : "",
    defect_type: "",
    manufacturer: "",
    status : "",
    serial_no : "",
    

  },
};

const tyreStatusFilterSlice = createSlice({
  name: "TyreStatusFilter",
  initialState,
  reducers: {
    setTyreStatusFormData: (state, action) => {
      // Merge the current state with the updated field(s)
      state.formData = { ...state.formData, ...action.payload };
    },
    resetTyreStatusFormData: (state) => {
      // Reset formData to the initialState
      state.formData = { ...initialState.formData };
    },
  },
});

export const { setTyreStatusFormData, resetTyreStatusFormData } =
  tyreStatusFilterSlice.actions;

export default tyreStatusFilterSlice.reducer;
