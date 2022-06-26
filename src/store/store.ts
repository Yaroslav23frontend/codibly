import { configureStore } from '@reduxjs/toolkit';
import { reducerTable } from './reducers/reducerTable.ts';
type TableFormat = {
  id: number,
  name: string,
  color: string,
  year: string
}
export interface IRootState {
  table: Array<TableFormat>
}
export const store = configureStore({
  reducer: {
    table: reducerTable
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
