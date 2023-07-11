import { configureStore } from "@reduxjs/toolkit";

// Import your reducers
import rootReducer from "./reducers";

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  // Other configuration options (middleware, enhancers, etc.)
});

export default store;
