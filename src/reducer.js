import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import { reducer as toastr } from "react-redux-toastr";
import R from "ramda";
// components
// import loader from './components/common/loader/reducer';
// features
// global
import { CLEAR_STORE } from "./constants";
// import global from './global/reducer';
import employers from "./components/employers/reducer";
///////////////////////////////////////////////////////////////////////////////////////////////////

const appReducer = combineReducers({
  router,
  toastr,
  employers
  // global,
  // loader,
});
const rootReducer = (state: Object, action: Object) => {
  if (R.equals(action.type, CLEAR_STORE)) {
    // TODO, check it
    // On dev mode the belowe throw Warning: setState(...):
    // Can only update a mounted or mounting component.
    // This usually means you called setState() on an unmounted component.
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
