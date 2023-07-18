import { configureStore } from "@reduxjs/toolkit";

// Import your reducers
import rootReducer from "./reducers";

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
