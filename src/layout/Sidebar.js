import React from "react";
import { compose, withState } from "recompose";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  EquipmentsIcon,
  LogIcon
} from "../icons/icons";

const withColorState = compose(withState("color", "setColor", "#2ECC71"));

const SidebarLink = withColorState(props => (
  <Link
    onMouseLeave={() => props.setColor("#2ECC71")}
    onMouseEnter={() => props.setColor("#34495e")}
    to={props.link}
    className={props.active ? "link active" : "link"}
  >
    {props.icon({ color: props.active ? "#34495e" : props.color })}
  </Link>
));

const menuItems = [
  {
    link: "/",
    icon: HomeIcon
  },
  {
    link: "/users",
    icon: UsersIcon
  },
  {
    link: "/equipments",
    icon: EquipmentsIcon
  }
];

const loginItem = [
  {
    link: "/loginpage",
    icon: LogIcon
  }
]

const Sidebar = props => (
  <div className="sidebar">
    <div className="head-links">
      {menuItems.map((menuIlem, index) => (
        <SidebarLink
          active={props.history.location.pathname === menuIlem.link}
          key={index}
          link={menuIlem.link}
          icon={menuIlem.icon}
        />
      ))}
    </div>
    <div className="footer-link">
      <div className="footer-line" />
      {loginItem.map((loginElem, index) => (
        <SidebarLink
          active={props.history.location.pathname === loginElem.link}
          key={index}
          link={loginElem.link}
          icon={loginElem.icon}
        />
      ))}
    </div>
    <style>
      {`
        .sidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-wrap: wrap;
          background-color: #34495e;
          width: 100%;
        }

        .head-links {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .link {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 80px;
        }

        .link:hover,
        .link.active {
          background-color: #2ecc71;    
        }

        .footer-link {
          display: flex;
          align-items: center;
          justify-content: center;
          outline: solid 1px #587da2;
          width: 100%;
          height: 80px;
        }
      `}
    </style>
  </div>
);

export default Sidebar;
