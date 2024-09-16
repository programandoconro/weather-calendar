import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "./reducers/coordinates";

const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
