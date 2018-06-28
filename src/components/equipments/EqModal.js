import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { fire } from "../../firebaseApp";
import R from "ramda";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'column',
    width: 'max-content',
    height: 'max-content',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    textTransform: 'uppercase',
  },
});

class SimpleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { equiprequest: {} }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let equipmentsRef = fire
      .database()
      .ref("equiprequest")
      .orderByKey()
      .limitToLast(100);

    equipmentsRef.once("value").then(snapshot => {
      const equipmentsreq = R.mapObjIndexed(
        (value, key) => R.assoc("id", key, value),
        snapshot.val() || []
      );
      this.setState({ equipmentsreq });
    });

    equipmentsRef.on("child_added", snapshot => {
      /* Update React state when message is added at Firebase Database */
      let equipmentreq   = R.assoc("id", snapshot.key, snapshot.val());
      this.setState({
        equipmentsreq: R.merge(this.state.equipmentsreq, {
          [equipmentreq.id]: equipmentreq
        })
      });
    });
  }
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  addEquipment(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */

    fire
      .database()
      .ref("equiprequest")
      .push({
        type: this.TypeEq.value || "",
        name: this.NameEq.value || "",
        number: this.NumberEq.value || ""
      });
    this.TypeEq.value = "";
    this.NameEq.value = "";
    this.NumberEq.value = "";
    this.handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen} className="request-equip" variant="contained" color="primary" type="input">
          Request an equipment
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <form onSubmit={this.addEquipment.bind(this)}>
            <div style={getModalStyle()} className={classes.paper}>
              <p className="modal-txt">request an equipment</p>
              <TextField
                className="modal-input"
                label="Equipment type"
                inputRef={el => (this.TypeEq = el)}
              />
              <TextField
                className="modal-input"
                label="Equipment name"
                inputRef={el => (this.NameEq = el)}
              />
              <TextField
                className="modal-input"
                label="Number of equipments"
                inputRef={el => (this.NumberEq = el)}
              />
              <div className="btn-block">
                <Button className="btn-save" type="submit">save</Button>
                <Button className="btn-cancel" onClick={this.handleClose}>cancel</Button>
              </div>
            </div>
          </form>
        </Modal>
        <style>
          {`
            .request-equip {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 240px;
              height: 40px;
              border-radius: 5px;
              background-color: #34495e;
              color: #fff;
              font-weight: bold;
            }

            .modal-txt {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 10vh;
              width: 110%;
              background-color: #2ecc71;
              border-radius: 5px;
              box-shadow: 0 4px 7px 0 #1ba85783;
              color: #34495e;
              font-size: 26px;
              margin-top: -20px;
            }

            .modal-input {
              min-width: 300px;
              max-width: 500px;
              margin-top: 10px;
            }

            .btn-block {
              display: flex;
              align-items: center;
              justify-content: space-around;
              width: 80%;
              margin-top: 20px;
            }

            .btn-save {
              width: 100px;
              height: 10px;
              background-color: #2ecc71;
              color: #34495e;
              font-weight: bold;
            }

            .btn-cancel {
              width: 100px;
              height: 10px;
              background-color: #fc4b4b;
              color: #34495e;
              font-weight: bold;
            }
          `}
        </style>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const EqModal = withStyles(styles)(SimpleModal);

export default EqModal;