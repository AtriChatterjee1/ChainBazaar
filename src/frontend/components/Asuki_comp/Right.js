import React from "react";
import { useContext } from "react";
import { WalletContext } from "../Wallet";

import nft1 from "../../assets/1.jpg";
import nft2 from "../../assets/2.jpg";
import nft3 from "../../assets/3.jpg";
import nft4 from "../../assets/4.jpg";
import nft5 from "../../assets/5.jpg";
import nft6 from "../../assets/6.jpg";
import nft7 from "../../assets/7.jpg";
import nft8 from "../../assets/8.jpg";
import nft9 from "../../assets/9.jpg";
import nft10 from "../../assets/10.png";
import nft11 from "../../assets/11.jpg";
import nft12 from "../../assets/12.jpg";

import "./Right.css"

const Right = () => {
  return (
    <div className="collection-container">
      <div className="cc-boxes">
        <div className="cc-block">
          <img src={nft1} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft2} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft3} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft4} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft5} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft6} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft7} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft8} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft9} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft10} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft11} alt="" />
        </div>
        <div className="cc-block">
          <img src={nft12} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Right;
