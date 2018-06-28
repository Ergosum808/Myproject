import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

const Layout = props => (
  <div className="app">
    <Header />
    <Sidebar {...props} />
    <Content />
    <style>
      {`
        * {
          box-sizing: border-box;
        }
        .header {
          grid-area: header;
        }

        .sidebar {
          grid-area: sidebar;
        }

        .content {
          grid-area: content;
        }

        .app {
          display: grid;
          grid-template-columns: 80px calc(100vw - 80px);
          grid-template-rows: 100px calc(100vh - 100px);
          grid-template-areas: 
            "header header header header"
            "sidebar content content content"
            "sidebar content content content"; 
          background-color: #fbfbfb;
          box-shadow: 0 1px 10px 10px rgba(229, 229, 229, 0.9);
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
      `}
    </style>
  </div>
);

export default Layout;
