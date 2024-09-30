// src/redux/store/Store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux'; // Import combineReducers
import menuReducer from '../Slices/menuSlice.js';
import userReducer from "../Slices/userSlice.js";
import filterReducer from '../Slices/masterFilterSlice.js';
import inspectionFilterReducer from "../Slices/inspectionFilterSlice.js";
import mechanicaDefFilterReducer from "../Slices/mechanicalFilterSlice.js";
import pendingInspectionReducer from "../Slices/pendingFilterSlice.js"; 
import dashboardTableFilter from "../Slices/DasboardPopup.js";
import lowNsdFilter from "../Slices/lowNsdFilterSlice.js";
import tyreWearFilter from "../Slices/tyreWearFilterSlice.js";
import tyrePurchaseFilter from '../Slices/tyrePurchaseFilterSlice.js';
import scrapAnalysisFilter from "../Slices/scrapFilter.js";

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine all reducers into a single reducer
const rootReducer = combineReducers({
  menu: menuReducer,
  user: userReducer,
  filter: filterReducer,
  inspectionFilter: inspectionFilterReducer,
  mechanicalFilter: mechanicaDefFilterReducer,
  pendingInspectionFilter: pendingInspectionReducer,
  dashboardTableFilter: dashboardTableFilter,
  lowNsdFilter: lowNsdFilter,
  tyreWearFilter,
  tyrePurchaseFilter,
  scrapAnalysisFilter
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);
