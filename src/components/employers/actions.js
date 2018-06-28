import { createAction } from "redux-act";

export const getEmployersListRequest = createAction("getEmployersListRequest");
export const getEmployersListSuccess = createAction("getEmployersListSuccess");

export const onChacngeEmployersList = createAction("onChacngeEmployersList");
export const onChacngeEmployersListSuccess = createAction(
  "onChacngeEmployersListSuccess"
);
