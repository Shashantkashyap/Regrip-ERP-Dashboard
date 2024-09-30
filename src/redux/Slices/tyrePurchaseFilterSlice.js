import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    vendor_name: "",
    from: "",
    to: "",
    report_type: "invoice-wise",
    page: 1,
    limit: 10
  },
};

const filterSlice = createSlice({
    name: "inspectionFilter",
    initialState,
    reducers: {
      setTyrePurchaseFormData: (state, action) => {
        // Merge the current state with the updated field(s)    
        state.formData = { ...state.formData, ...action.payload };
        console.log("Slice: ", state.formData, action.payload);
      },
      resetTyrePurchaseFormData: (state) => {
        state.formData = initialState.formData;
      },
    },  
});
  
export const { setTyrePurchaseFormData, resetTyrePurchaseFormData } = filterSlice.actions;
  
export default filterSlice.reducer;

