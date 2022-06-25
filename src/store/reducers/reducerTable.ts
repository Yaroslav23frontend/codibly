import { uploadTable } from "../action";
type ACTIONTYPE =
  { type: string; payload: Array<object> }

export function reducerTable(state = [], action: ACTIONTYPE) {
  switch (action.type) {
    case uploadTable:
      return action.payload;
    default:
      return state;
  }
}
