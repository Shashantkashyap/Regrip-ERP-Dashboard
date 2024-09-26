import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/Store.js"; // Import persistor
import { Toaster } from "react-hot-toast";
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* Wrap your app with PersistGate */}
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);