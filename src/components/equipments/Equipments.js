import React from "react";
import { PlusIcon } from "../../icons/icons";
import IconButton from "@material-ui/core/IconButton";
import EqInput from "./EqInput";
import EqModal from "./EqModal";

const Equipments = () => (
  <div className="equipments">
    <div className="head-equip">
      <div className="equip-wrap">
        <div className="equip-block">
          <div className="equip-txt">equipments</div>
          <IconButton>
            <PlusIcon />
          </IconButton>
        </div>
      </div>
      <div className="request-block">
        <EqModal />
      </div>
    </div>
    <EqInput />
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

export default Equipments;
