import React from "react";

const Header = () => (
  <div className="header">
    <div className="pig-photo">
      <img src="https://cdn.zeplin.io/5ab5242eb500a1759e6f7671/assets/CE651DD8-5731-4FE5-B8AA-B91E2ED29221.png" alt="" />
    </div>
    <div className="admin-block">
      <div className="admin-name">
        liubov bulavynets
        <div className="admin">admin</div>
      </div>
      <img src="https://cdn.zeplin.io/5ab5242eb500a1759e6f7671/assets/1D50DAA4-F654-442B-ACB9-6D83D0213DA0.png" alt="" />
    </div>
    <style>
      {`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #ffffff;
          box-shadow: 0 2px 10px 0 rgba(52, 73, 94, 0.9);
        }

        .pig-photo {
          margin-left: 2vw;
          width: 80px;
          height: 80px;
        }

        .admin-block {
          display: flex;
          align-items: center;
          margin-right: 2vw;
        }

        .admin-name {
          display: flex;
          width: 180px;
          flex-direction: column;
          color: #34495e;
          text-transform: capitalize;
          font-weight: 550;
          font-size: 20px;
        }

        .admin {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 88px;
          height: 27px;
          border-radius: 2px;
          background-color: #34495e80;
          color: #fff;
        }
      `}
    </style>
  </div>
);

export default Header;
