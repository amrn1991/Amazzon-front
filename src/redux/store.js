import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducer";

const store = configureStore({
  reducer: productsReducer,
});

export default store;
