import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import Log from "./components/Log";
import { auth } from "./firebaseApp";
import Layout from "./layout/Layout";

function some(history) {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      localStorage.setItem("dashboardUser", user);
    } else {
      console.log("BASFAS");
      history.push("/loginpage");
    }
  });
}

export const LogIn = props => (
  <div className="go">
    <Log {...props} />
  </div>
);

class App extends Component {
  componentWillMount() {
    some(this.props.history);
  }
  render() {
    console.log(this.props);
    return (
      <Switch>
        <Route path="/loginpage" component={LogIn} />
        <Route path="/" component={Layout} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.loader
  };
}

export default withRouter(connect(mapStateToProps)(App));
