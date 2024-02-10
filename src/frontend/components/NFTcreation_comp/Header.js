import React from "react";
import "./Header.css"; // Make sure to create a CSS file with this name
import { NavLink } from "react-router-dom";

const Header = ({ balanceWallet }) => {
  console.log(balanceWallet);
  return (
    <header className="header">
      <div className="arr_line">
        <NavLink to="/">
          <button className="back-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path
                d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
                fill="white"
              />
            </svg>
          </button>
        </NavLink>
        <div className="heading">
          <span className="main_heading">Create an NFT</span>
          <span className="heading_content">
            Once your item is minted you will not be able to change any of its
            information.
          </span>
        </div>
      </div>
      <div className="wallet-info">
        <div className="balance">
          <button
            onClick={() => {}}
            className="balance_check"
            style={{ color: "white" }}>
            {balanceWallet} ETH
          </button>
        </div>
        <div className="wallet-indicator"></div>
      </div>
    </header>
  );
};

export default Header;
