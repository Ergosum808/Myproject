import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { auth, storageKey } from "../firebaseApp";
import TextField from "@material-ui/core/TextField";

class Log extends Component {
  state = {
    uid: null,
    name: "",
    password: ""
  };
  onSubmitForm(e) {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.name, this.state.password)
      .then(values => {
        console.log(this.props);
        this.props.history.push("/");
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({ uid: user.uid });
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({ uid: null });
      }
    });
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  render() {
    return (
      <div className="log-page">
        <div className="login-form">
          <div className="login-header-text">
            <p>amous equipment</p>
            <p>management system</p>
          </div>
          <div className="sign-in">
            <div className="sign-block">
              <p>sign in</p>
            </div>
          </div>
          <form onSubmit={this.onSubmitForm} className="sign-form">
            <TextField
              id="login"
              label="Email:"
              className="text-field"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              margin="normal"
            />
            <TextField
              id="password-input"
              label="Password:"
              className="text-field"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              autoComplete="current-password"
              margin="normal"
            />
            <div className="btn-block">
              <Button className="btn-sign" type="submit">
                sign in
              </Button>
            </div>
          </form>
        </div>
        <style>
          {`
              * {
                padding: 0;
                margin: 0;
              }

              .log-page {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                width: 100%;
                height: 100vh;
                background: url(https://firebasestorage.googleapis.com/v0/b/inventory-78b2d.appspot.com/o/login%20page%20copy1.png?alt=media&token=479caa04-d45b-4a94-9960-9aafda850384), 
                url(https://firebasestorage.googleapis.com/v0/b/inventory-78b2d.appspot.com/o/login%20page%20copy2.png?alt=media&token=66f92999-98ed-4a28-9b49-93be7e8bb90e) no-repeat no-repeat;
                background-size: 100% 100%;
                
              }

              .login-form {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                width: 40%;
                height: max-content;
                margin-right: 50px;
              }

              .login-header-text {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                text-transform: capitalize;
                font-size: 40px;
                margin-top: -150px;
                color: #34495e;
              }

              .sign-in {
                display: flex;
                justify-content: center;
                width: calc(100% - 50px);
              }

              .sign-block {
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

              .sign-form {
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: #ffffff;
                box-shadow: 0 2px 10px #98989880;
                border: solid 1px #dadada;
                width: 100%;
                height: max-content;
                padding: 50px 25px 25px;
              }

              .btn-block {
                display: flex;
                justify-content: center;
                aign-items: center;
                margin: 20px;
              }

              .btn-sign {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80%;
                background-color: #2ecc71;
                border-radius: 5px;
                color: #34495e;
                font-weight: bold;
                box-shadow: 0 2px 10px #98989880;
              }
            
            `}
        </style>
      </div>
    )
  }
}



export default Log;
