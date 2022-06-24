import { configureStore } from "@reduxjs/toolkit";
import { reducerTable } from "./reducers/reducerTable";

export const store = configureStore({
  reducer: {
    table: reducerTable,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
