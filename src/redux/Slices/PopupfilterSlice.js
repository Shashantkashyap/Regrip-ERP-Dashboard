import { createSlice } from "@reduxjs/toolkit";

// Define initial state object
const initialState = {
  formData: {
    vehicle_no: "",
    brand_name: "",
    construction_type: "",
    product_category: "",
    nsdLess: "",
    nsdGreater: ""
  },
};

// Create the slice using Redux Toolkit's createSlice function
const popupFilterSlice = createSlice({
  name: "popupFilter",
  initialState,
  reducers: {
    // Update specific fields in formData without overwriting the entire object
    setPopupFormData: (state, action) => {
      state.formData = {
        ...state.formData,  // Maintain existing form data
        ...action.payload,  // Update with new data
      };
    },
    
    // Reset formData to its initial state
    resetPopupFormData: (state) => {
      state.formData = { ...initialState.formData };
    },
  },
});

// Export actions for use in components
export const { setPopupFormData, resetPopupFormData } = popupFilterSlice.actions;

// Export the reducer to be included in the Redux store
export default popupFilterSlice.reducer;
