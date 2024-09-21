import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../Slices/menuSlice.js';
import userReducer from "../Slices/userSlice.js"
import filterReducer from '../Slices/masterFilterSlice.js';
import inspectionFilterReducer from "../Slices/inspectionFilterSlice.js"
import mechanicaDefFilterReducer from "../Slices/mechanicalFilterSlice.js"
import pendingInspectionReducer from "../Slices/pendingFilterSlice.js" 
import dashboardTableFilter from "../Slices/DasboardPopup.js"


export const store = configureStore({
  reducer: {
    menu: menuReducer,
    user: userReducer,
    filter:filterReducer,
    inspectionFilter: inspectionFilterReducer,
    mechanicalFilter : mechanicaDefFilterReducer,
    pendingInspectionFilter : pendingInspectionReducer,
    dashboardTableFilter: dashboardTableFilter
    }
});
