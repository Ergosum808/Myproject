/* eslint-disable */
import {
  createStore as createReduxStore,
  applyMiddleware,
  compose
} from "redux";
import { createLogicMiddleware } from "redux-logic";
import reducers from "./reducer";
import arrLogic from "./logic";
import {
  getEmployersListRequest,
  onChacngeEmployersList
} from "./components/employers/actions";
///////////////////////////////////////////////////////////////////////////////////////////////////

let initialState = {};

function createStore() {
  const logicMiddleware = createLogicMiddleware(arrLogic);
  const middleWares = [logicMiddleware];
  const composables = [applyMiddleware(...middleWares)];
  const store = createReduxStore(
    reducers,
    initialState,
    compose(...composables)
  );
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept("./reducer", () => {
      store.replaceReducer(reducers);
    });
  }
  store.dispatch(getEmployersListRequest());
  // store.dispatch(onChacngeEmployersList());
  return store;
}

export default createStore;
/* eslint-enable */
