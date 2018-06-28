import React, { Component } from "react";
import R from "ramda";
import { connect } from "react-redux";
import { fire } from "../../firebaseApp";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Delete, Search } from "../../icons/icons";
import IconButton from "@material-ui/core/IconButton";
//import EquipmentsList from "./TableEquipment";
import EquipmentsList from "./old-table";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

class EqInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipments: {},
      equipmentTypes: {},
      // employers: {},
      equiprequests: {},
      createFormOpened: false
    }; // <- set up react state
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let equipmentsRef = fire
      .database()
      .ref("equipments")
      .orderByKey()
      .limitToLast(100);

    equipmentsRef.once("value").then(snapshot => {
      const equipments = R.mapObjIndexed(
        (value, key) => R.assoc("id", key, value),
        snapshot.val() || []
      );
      this.setState({ equipments });
    });

    equipmentsRef.on("child_added", snapshot => {
      /* Update React state when message is added at Firebase Database */
      let equipment = R.assoc("id", snapshot.key, snapshot.val());
      this.setState({
        equipments: R.merge(this.state.equipments, {
          [equipment.id]: equipment
        })
      });
    });

    let equipmentTypeRef = fire
      .database()
      .ref("equipmentTypeDropdown")
      .orderByKey()
      .limitToLast(100);

    equipmentTypeRef.once("value").then(snapshot => {
      const equipmentTypes = R.mapObjIndexed(
        (value, key) => R.assoc("id", key, value),
        snapshot.val() || []
      );
      this.setState({ equipmentTypes });
    });

    // let employersRef = fire
    //   .database()
    //   .ref("employers")
    //   .orderByKey()
    //   .limitToLast(100);

    // employersRef.once("value").then(snapshot => {
    //   const employers = R.mapObjIndexed(
    //     (value, key) => R.assoc("id", key, value),
    //     snapshot.val() || []
    //   );
    //   this.setState({ employers });
    // });
  }

  handleDelete(guids) {
    console.log(guids);
    fire
      .database()
      .ref("equipments/" + guids[0])
      .remove()
      .then(() =>
        this.setState({ equipments: R.omit([guids[0]], this.state.equipments) })
      )
      .catch(error => console.log(error));
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  addEquipment(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */

    fire
      .database()
      .ref("equipments")
      .push({
        equipmentType: this.TypeEq.value || "",
        equipmentName: this.NameEq.value || "",
        equipmentId: this.IdEq.value || "",
        dateOfEntry: this.Date.value || "",
        warrantyNumber: this.Warranty.value || "",
        assignTo: this.Assign.value || "",
        receivingAgreementNumber: this.Receiving.value || "",
        equipmentGroupNumber: this.EqGroupNum.value || ""
      });
    this.TypeEq.value = "";
    this.NameEq.value = "";
    this.IdEq.value = "";
    this.Date.value = "";
    this.Warranty.value = "";
    this.Assign.value = "";
    this.Receiving.value = "";
    this.EqGroupNum.value = "";
  }
  render() {
    console.log("ASDFKJAFKJASBFBASK", this.props);
    return (
      <div className="input-forms">
        <div className="equipment-add-new">
          <div className="add-equipment">
            <div className="add-block">
              <p>add new equipment</p>
              <IconButton>
                <Delete />
              </IconButton>
            </div>
          </div>
          <form
            className="equipments-form"
            onSubmit={this.addEquipment.bind(this)}>
            <div className="equipments-form-head">
              <FormControl className="equip-input">
                <InputLabel htmlFor="age-native-simple">
                  Equipment type
                </InputLabel>
                <Select native inputRef={el => (this.TypeEq = el)}>
                  <option value="" />
                  {R.values(
                    R.map(
                      option => <option>{option.value}</option>,
                      this.state.equipmentTypes
                    )
                  )}
                </Select>
              </FormControl>
              <TextField
                className="equip-input"
                type="text"
                inputRef={el => (this.NameEq = el)}
                label="Equipment name"
              />
              <TextField
                className="equip-input"
                type="text"
                inputRef={el => (this.IdEq = el)}
                label="Equipment ID"
              />
              <TextField
                className="equip-input"
                type="date"
                defaultValue="2018-03-05"
                inputRef={el => (this.Date = el)}
                label="Date of entry"
              />
              <FormControl className="equip-input">
                <InputLabel htmlFor="age-native-simple">Assign To</InputLabel>
                <Select native inputRef={el => (this.Assign = el)}>
                  <option value="" />
                  {R.values(
                    R.mapObjIndexed(
                      (option, index) => (
                        <option value={index}>
                          {option.firstName} {option.lastName}
                        </option>
                      ),
                      this.props.employers
                    )
                  )}
                </Select>
              </FormControl>
              <TextField
                className="equip-input"
                type="text"
                inputRef={el => (this.Warranty = el)}
                label="Warranty #"
              />
              <TextField
                className="equip-input"
                type="text"
                inputRef={el => (this.Receiving = el)}
                label="Receiving agreement #"
              />
              <TextField
                className="equip-input"
                type="text"
                inputRef={el => (this.EqGroupNum = el)}
                label="Equipment group #"
              />
            </div>
            <div className="equipments-button">
              <Button
                className="eq-btn"
                variant="outlined"
                color="primary"
                type="submit">
                save
              </Button>
            </div>
          </form>
        </div>
        <div className="equipments-list">
          <div className="header-eq-list">
            <div className="equipments-list-block">
              <p>equipments list</p>
              <div className="equip-input-search">
                <TextField
                  label="Search"
                  type="search"
                  margin="none"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
          </div>
          <form className="equipments-list-form">
            <EquipmentsList
              handleDelete={this.handleDelete}
              equipments={this.state.equipments}
            />
          </form>
        </div>
        <style>
          {`
          .input-forms {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            padding: 0 25px 50px 25px;
          }

          .equipment-add-new {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
          }

          .add-equipment {
            width: calc(100% - 50px);
          }  

          .add-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 8vh;
            background-color: #2ecc71;
            border-radius: 5px;
            box-shadow: 0 4px 7px 0 #1ba85783;
            color: #34495e;
            font-size: 20px;
            padding: 0 20px;
            font-weight: bold;
            transform: translateY(50%);
            text-transform: capitalize;
          }

          .equipments-form {
            display: flex;
            flex-wrap: wrap;
            background-color: #ffffff;
            box-shadow: 0 2px 10px #98989880;
            border: solid 1px #dadada;
            width: 100%;
            height: max-content;
            justify-content: flex-end;
            padding: 50px 25px 25px;
          }

          .equipments-form-head {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .equip-input {
            min-width: 300px;
            max-width: 500px;
            margin-top: 30px;
          }

          .equip-input-search {
            display: flex;
            width: 200px;
            justify-content: space-between;
          }

          .equipments-button {
            padding: 50px 0 0;
          }

          .eq-btn {
            width: 140px;
            height: 10px;
            background-color: #2ecc71;
            color: #34495e;
            font-weight: bold;
          }

          .equipments-list {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
          }

          .header-eq-list {
            width: calc(100% - 50px);
          }

          .equipments-list-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 8vh;
            background-color: #2ecc71;
            border-radius: 5px;
            box-shadow: 0 4px 7px 0 #1ba85783;
            color: #34495e;
            font-size: 20px;
            padding: 0 20px;
            font-weight: bold;
            transform: translateY(50%);
            text-transform: capitalize;
          }

          .equipments-list-form {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background-color: #ffffff;
            box-shadow: 0 2px 10px #98989880;
            border: solid 1px #dadada;
            width: 100%;
            height: max-content;
            padding: 50px 25px 25px;
            overflow: auto;
          }
          `}
        </style>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employers: state.employers.employersList
  };
}

export default connect(mapStateToProps)(EqInput);
