import React from "react";
import ForDashboard from "./ForDashboard";

const DashBoard = () => (
  <div className="dashboard">
    <ForDashboard />
    <style>
      {`
        .dashboard {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex-wrap: wrap;
          background-color: #ecf0f1;
          width: 100%;
        }

        .header-dash {
          display: flex;
          align-items: start;
          justify-content: center;
          background-color: inherit;
          text-transform: capitalize;
          width: 100%;
        }

        h1 {
          display: flex;
          justify-content: center;
        }

        .module-dash {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}
    </style>
  </div>
);

export default DashBoard;
