import React from "react";
import { Route, Switch } from "react-router-dom";
import Equipments from "../components/equipments/Equipments";
// import Users from "../components/Users";
import Users from "../components/employers";
import Home from "../components/home/Home";

const Content = () => (
  <div className="content">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/equipments" component={Equipments} />
    </Switch>
    <style>
      {`
        body {
          margin: 0;
          padding: 0;
        }
        .content {
          background-color: #ecf0f1;
          overflow-y: scroll;
        }
      `}
    </style>
  </div>
);

export default Content;
