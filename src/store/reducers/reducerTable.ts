import { uploadTable } from "../action";

type ACTIONTYPE_TABLE =
  { type: string; payload: Array<TableFormat> }
export function reducerTable(state = [], action: ACTIONTYPE_TABLE) {
  switch (action.type) {
    case uploadTable:
      return action.payload;
    default:
      return state;
  }
}
