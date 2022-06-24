import { uploadTable } from "../action";
export function reducerTable(state = [], action) {
  switch (action.type) {
    case uploadTable:
      return action.payload;
    default:
      return state;
  }
}
