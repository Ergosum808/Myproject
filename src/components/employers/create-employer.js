import React, { Component } from "react";
import R from "ramda";
import { fire, auth } from "../../firebaseApp";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Delete, Search } from "../../icons/icons";
import IconButton from "@material-ui/core/IconButton";
import EquipmentsList from "./employers-list";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { employerConfig } from "./settings/fields-configs";

class EqInput extends Component {
  constructor(props) {
    super(props);
    this.state = { employers: props.employers }; // <- set up react state
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

    let data = R.indexBy(R.prop("name"), employerConfig);

    data = R.map(value => this[value.name].value, data);
    auth
      .createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(() => {
        fire
          .database()
          .ref("employers")
          .push(data);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    employerConfig.forEach(config => {
      this[config.name].value = "";
    });
  }
  render() {
    return (
      <div className="input-forms">
        <div className="equipment-add-new">
          <div className="add-equipment">
            <div className="add-block">
              <p>add new employee</p>
              <IconButton>
                <Delete />
              </IconButton>
            </div>
          </div>
          <form
            className="equipments-form"
            onSubmit={this.addEquipment.bind(this)}
          >
            <div className="equipments-form-head">
              <div className="equipments-form-head">
                {employerConfig.map(config => (
                  <TextField
                    className="equip-input"
                    type={config.type}
                    inputRef={el => (this[config.name] = el)}
                    label={config.label}
                  />
                ))}
              </div>
            </div>
            <div className="equipments-button">
              <Button
                className="eq-btn"
                variant="outlined"
                color="primary"
                type="submit"
              >
                save
              </Button>
            </div>
          </form>
        </div>
        <div className="equipments-list">
          <div className="header-eq-list">
            <div className="equipments-list-block">
              <p>employees list</p>
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
              {...this.props}
              configs={employerConfig}
              equipments={this.props.employers}
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

export default EqInput;
