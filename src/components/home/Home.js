import React from "react";
import ImageGridList from "./CardHome";
import { withRouter } from "react-router-dom";

const Home = () => (
  <div className="inventory-board">
    <ImageGridList />
    <style>
      {`
        .inventory-board {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}
    </style>
  </div>
);

export default withRouter(Home);
