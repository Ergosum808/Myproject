import { createReducer } from "redux-act";
import { $set } from "plow-js";
import * as Actions from "./actions.js";

export const initialState = {
  employersList: {}
};

export const getEmployersListSuccess = (state: Object, data: Object) =>
  $set("employersList", data, state);

export const onChacngeEmployersListSuccess = (state: Object, data: Object) =>
  $set("employersList", { ...state.employersList, [data.id]: data }, state);

export default createReducer(
  {
    [Actions.getEmployersListSuccess]: getEmployersListSuccess,
    [Actions.onChacngeEmployersListSuccess]: onChacngeEmployersListSuccess
  },
  initialState
);
