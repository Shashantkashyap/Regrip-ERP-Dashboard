import { createSlice } from "@reduxjs/toolkit";

// Define initial state object
const initialState = {
  formData: {
    vehicle_num: "",
    nsd: ""
  },
};

// Create the slice using Redux Toolkit's createSlice function
const lowNsdFilterSlice = createSlice({
  name: "lowNsdFilter",
  initialState,
  reducers: {
    // Update specific fields in formData without overwriting the entire object
    setLowNsdFormData: (state, action) => {
      state.formData = {
        ...state.formData,  // Maintain existing form data
        ...action.payload,  // Update with new data
      };
    },
    
    // Reset formData to its initial state
    resetLowNsdFormData: (state) => {
      state.formData = { ...initialState.formData };
    },
  },
});

// Export actions for use in components
export const { setLowNsdFormData, resetLowNsdFormData } = lowNsdFilterSlice.actions;

// Export the reducer to be included in the Redux store
export default lowNsdFilterSlice.reducer;
