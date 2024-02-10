import React from "react";
import "./HomePage.css";
import Menu from "./Menu";
import Hero from "./Hero";
import Navbar from "./Navbar";
import ChatBot from "./ChatBot";

const HomePage = ({ saveAccount, account }) => {
  return (
    <div className="home">
      {/* <div className="App"> */}
      <Navbar saveAccount={saveAccount} account={account} />
      <Hero account={account} />
      <Menu account={account} />
      <ChatBot />
      {/* </div> */}
    </div>
  );
};

export default HomePage;
