import { createLogic } from "redux-logic";
import R from "ramda";
import {
  getEmployersListSuccess,
  onChacngeEmployersListSuccess
} from "./actions";
import { fire } from "../../firebaseApp";

// TODO, with mapping permissions to actions

export const handleGetEmployersLogic = createLogic({
  type: [/getEmployersListRequest/],
  process({ getState, action }, dispatch, done) {
    let employersRef = fire
      .database()
      .ref("employers")
      .orderByKey()
      .limitToLast(100);
    employersRef
      .once("value")
      .then(snapshot => {
        const employers = R.mapObjIndexed(
          (value, key) => R.assoc("id", key, value),
          snapshot.val() || []
        );
        dispatch(getEmployersListSuccess(employers));
      })
      .catch(error => console.log(error))
      .then(() => done());
  }
});

export const handleChacngeEmployersListLogic = createLogic({
  type: [/onChacngeEmployersList/],
  process({ getState, action }, dispatch, done) {
    let employersRef = fire
      .database()
      .ref("employers")
      .orderByKey()
      .limitToLast(100);

    // this.props.getEmployersListRequest();

    employersRef.on("child_added", snapshot => {
      let employer = R.assoc("id", snapshot.key, snapshot.val());
      dispatch(onChacngeEmployersListSuccess(employer));
      done();
    });
  }
});

export default [handleGetEmployersLogic, handleChacngeEmployersListLogic];
