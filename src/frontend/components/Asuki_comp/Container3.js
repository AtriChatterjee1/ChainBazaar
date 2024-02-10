import React from "react";
import "./Container3.css";
import Right from "./Right";
import Left from "./Left";
const Container3 = () => {
  return (
    <div>
      <div className="main">
        <div className="left">
          <Left />
        </div>
        <div className="right">
          <Right />
        </div>
      </div>
    </div>
  );
};

export default Container3;
