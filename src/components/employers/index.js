import React from "react";
import R from "ramda";
import { connect } from "react-redux";
import { compose, withState, lifecycle, withHandlers } from "recompose";
import { PlusIcon } from "../../icons/icons";
import { fire } from "../../firebaseApp";
import { getEmployersListRequest, getEmployersListSuccess } from "./actions";
import IconButton from "@material-ui/core/IconButton";
import CreateEmployerComponent from "./create-employer";

const enchence = compose(
  withState("isOpened", "setIsOpened", true),
  // withState("employers", "setEmployers", {}),
  withHandlers({
    handleDeleteEmployer: props => guid => {
      fire
        .database()
        .ref("employers/" + guid)
        .remove()
        .then(() => props.setEmployers(employers => R.omit([guid], employers)))
        .catch(error => console.log(error));
    },
    handleAddEmployers: () => () => {
      console.log("add");
    }
  }),
  lifecycle({
    componentWillMount() {
      let employersRef = fire
        .database()
        .ref("employers")
        .orderByKey()
        .limitToLast(100);
      // this.props.getEmployersListRequest();
      employersRef.on("child_added", snapshot => {
        let employer = R.assoc("id", snapshot.key, snapshot.val());
        this.props.getEmployersListSuccess({
          ...this.props.employers,
          [employer.id]: employer
        });
      });
    }
  })
);

const Employers = props => (
  <div className="equipments">
    {console.log("props", props.employers)}
    <div className="head-equip">
      <div className="equip-wrap">
        <div className="equip-block">
          <div className="equip-txt">Employees</div>
          <IconButton>
            <PlusIcon />
          </IconButton>
        </div>
      </div>
    </div>
    <CreateEmployerComponent {...props} />
    <style>
      {`
        .head-equip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 10vh;
        }

        .equip-wrap {
          display: flex;
          justify-content: center;
          width: 250px;
        }

        .equip-block {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 160px;
          height: 5vh
        }

        .equip-txt {
          display: flex;
          color: #34495e;
          align-items: center;
          justify-content: center;
          text-transform: capitalize;
          font-size: 24px;
          font-weight: bold;
        }

        .request-block {
          width: 275px;
        }
      `}
    </style>
  </div>
);

function mapStateToProps(state) {
  return {
    employers: state.employers.employersList
  };
}

export default connect(mapStateToProps, {
  getEmployersListRequest,
  getEmployersListSuccess
})(enchence(Employers));
