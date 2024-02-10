import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { WalletContext } from "../components/Wallet";
import Web3 from "web3";
import MarketplaceABI from "../ABI/MarketplaceABI.json";
import NFTABI from "../ABI/NFTABI.json";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import nft1 from "../assets/1.jpg";
import axios from "axios";
import logo from "../assets/Frame 109.png";
import { Link, NavLink, Navigate } from "react-router-dom";
const Navbar = ({ saveAccount, account }) => {
  const { setWallet, wallet } = useContext(WalletContext);
  const [account2, setAccount] = useState("");
  const [searchResults, setResults] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [verified, setVerified] = useState(false);

  // const Login = async () => {
  //   // console.log("here")
  //    init();
  //   // console.log("here1")
  //   console.log(state.contractMarketPlace)

  // }

  const init = async () => {
    //const web3 = new Web3("HTTP://127.0.0.1:7545");
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const addressMarketPlace = "0x439231575b8465F7E2492b547aCA5C4511423bC7";
      const addressNFT = "0x83122af965c4651812043Fa24bf7d55957e54e13";
      // const contract = new web3.eth.Contract(ABI,contractAddress);
      const contractMarketPlace = new web3.eth.Contract(
        MarketplaceABI,
        addressMarketPlace
      );
      const contractNFT = new web3.eth.Contract(NFTABI, addressNFT);
      console.log(contractMarketPlace);
      setWallet({
        web3: web3,
        // contract:contract,
        contractMarketPlace: contractMarketPlace,
        contractNFT: contractNFT,
      });
      console.log(wallet.contractMarketPlace);
      await selectAccount();
    }
  };

  useEffect(() => {
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");

      // Clear existing options
      select.innerHTML = "";

      // Array of accounts available in ganache
      var options = await wallet.web3.eth.getAccounts();
      setIsConnected(true);
      console.log("eff");
      saveAccount(options[0]);
      const res = await fetch("http://localhost:3001/addtolist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: options[0] }),
      });
      const res_verify = await res.json();
      console.log(res_verify);
      if (res_verify == "Verified") {
        setVerified(true);
      }
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        console.log(opt);
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    wallet.web3 && allAccounts();
  }, [wallet.web3]);
  console.log(account);
  const selectAccount = async () => {
    console.log("here");
    let selectedAccountAddress = document.getElementById("selectNumber").value;
    setAccount(selectedAccountAddress);
    console.log(selectedAccountAddress);
    console.log(account);
    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      saveAccount(selectedAccountAddress);
      // const response_verify = await axios.post(
      //   "http://localhost:3001/ifverified",
      //   { account }
      // );

      console.log("here");
      console.log(account);
    }
  };
  return (
    <div className="navbar">
      <div className="logo-img">
        <div className="round">
          <img
            src={logo}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
        <NavLink to="/">
          <h2>ChainBazaar</h2>
        </NavLink>

        <div className="vertical"></div>
      </div>
      <div id="searchbar">
        {/* <img src={searchlogo} alt="" /> */}
        <svg
          width="25"
          height="25"
          viewBox="0 0 47 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.5212 34.125C32.796 34.125 41.1253 27.2134 41.1253 18.6875C41.1253 10.1616 32.796 3.25 22.5212 3.25C12.2464 3.25 3.91699 10.1616 3.91699 18.6875C3.91699 27.2134 12.2464 34.125 22.5212 34.125Z"
            stroke="#FFF1A0"
            stroke-width="2.24"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M43.0837 35.75L39.167 32.5"
            stroke="#FFF1A0"
            stroke-width="2.24"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <input
          type="text"
          id="searchQuery"
          placeholder="Search"
          onClick={() => setResults(!searchResults)}
        />
      </div>
      {searchResults ? (
        <div id="searchResults">
          <div id="collections">
            Collections
            <div>
              <Link to="/about">
                <div id="s-collection">
                  <img src={nft1} alt="" />
                  <div id="s-description">
                    <p>Asuki</p>
                    <p>1,000 items</p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/about">
                <div id="s-collection">
                  <img src={nft1} alt="" />
                  <div id="s-description">
                    <p>Asuki</p>
                    <p>1,000 items</p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/about">
                <div id="s-collection">
                  <img src={nft1} alt="" />
                  <div id="s-description">
                    <p>Asuki</p>
                    <p>1,000 items</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div id="collections">
            Accounts
            <div>
              <Link to="/about">
                <div id="s-collection">
                  <img src={nft1} alt="" />
                  <div id="s-description">
                    <p>Asuki</p>
                    <p>1,000 items</p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/about">
                <div id="s-collection">
                  <img src={nft1} alt="" />
                  <div id="s-description">
                    <p>Asuki</p>
                    <p>1,000 items</p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/about">
                <div id="s-collection">
                  <img src={nft1} alt="" />
                  <div id="s-description">
                    <p>Asuki</p>
                    <p>1,000 items</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="feature">
        <NavLink to="/create">Create</NavLink>
        <svg
          className="cart"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none">
          <path
            d="M40.625 56.25C43.0412 56.25 45 54.2912 45 51.875C45 49.4588 43.0412 47.5 40.625 47.5C38.2088 47.5 36.25 49.4588 36.25 51.875C36.25 54.2912 38.2088 56.25 40.625 56.25Z"
            fill="#FFF1A0"
          />
          <path
            d="M20.625 56.25C23.0412 56.25 25 54.2912 25 51.875C25 49.4588 23.0412 47.5 20.625 47.5C18.2088 47.5 16.25 49.4588 16.25 51.875C16.25 54.2912 18.2088 56.25 20.625 56.25Z"
            fill="#FFF1A0"
          />
          <path
            d="M12.1 9.85L11.6 15.975C11.5 17.15 12.425 18.125 13.6 18.125H51.875C52.925 18.125 53.8 17.325 53.875 16.275C54.2 11.85 50.825 8.25 46.4 8.25H15.675C15.425 7.15 14.925 6.1 14.15 5.225C12.9 3.9 11.15 3.125 9.35 3.125H5C3.975 3.125 3.125 3.975 3.125 5C3.125 6.025 3.975 6.875 5 6.875H9.35C10.125 6.875 10.85 7.2 11.375 7.75C11.9 8.325 12.15 9.075 12.1 9.85Z"
            fill="#FFF1A0"
          />
          <path
            d="M51.275 21.875H12.925C11.875 21.875 11.025 22.675 10.925 23.7L10.025 34.575C9.67501 38.85 13.025 42.5 17.3 42.5H45.1C48.85 42.5 52.15 39.425 52.425 35.675L53.25 24C53.35 22.85 52.45 21.875 51.275 21.875Z"
            fill="#FFF1A0"
          />
        </svg>
        <NavLink to="/person">
          <svg
            className="profile"
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none">
            <path
              d="M30 5.00006C23.45 5.00006 18.125 10.3251 18.125 16.8751C18.125 23.3001 23.15 28.5001 29.7 28.7251C29.9 28.7001 30.1 28.7001 30.25 28.7251C30.3 28.7251 30.325 28.7251 30.375 28.7251C30.4 28.7251 30.4 28.7251 30.425 28.7251C36.825 28.5001 41.85 23.3001 41.875 16.8751C41.875 10.3251 36.55 5.00006 30 5.00006Z"
              fill="#FFF1A0"
            />
            <path
              d="M42.7 35.3751C35.725 30.7251 24.35 30.7251 17.325 35.3751C14.15 37.5001 12.4 40.3751 12.4 43.4501C12.4 46.5251 14.15 49.3751 17.3 51.4751C20.8 53.8251 25.4 55.0001 30 55.0001C34.6 55.0001 39.2 53.8251 42.7 51.4751C45.85 49.3501 47.6 46.5001 47.6 43.4001C47.575 40.3251 45.85 37.4751 42.7 35.3751Z"
              fill="#FFF1A0"
            />
          </svg>
        </NavLink>
        <div className="login">
          <button onClick={init}>
            <svg
              className="wallet"
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="39"
              viewBox="0 0 47 39"
              fill="none">
              <path
                d="M34.7631 11.4562C34.2931 11.3912 33.8036 11.375 33.2944 11.375H13.7111C13.1627 11.375 12.634 11.4075 12.1248 11.4725C12.399 11.0175 12.7907 10.595 13.2607 10.205L19.6252 4.9075C22.3082 2.6975 26.6556 2.6975 29.3386 4.9075L32.7656 7.78368C34.019 8.80743 34.6848 10.1074 34.7631 11.4562Z"
                stroke="#FFF1A0"
                stroke-width="2.24"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.625 30.875C17.625 32.0938 17.2137 33.2475 16.4891 34.2225C15.1379 36.1075 12.6508 37.375 9.79165 37.375C6.93248 37.375 4.4454 36.1075 3.09415 34.2225C2.36956 33.2475 1.95831 32.0938 1.95831 30.875C1.95831 27.2837 5.46373 24.375 9.79165 24.375C14.1196 24.375 17.625 27.2837 17.625 30.875Z"
                stroke="#FFF1A0"
                stroke-width="2.24"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.7129 30.8417H6.87708"
                stroke="#FFF1A0"
                stroke-width="2.24"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.79163 28.4692V33.328"
                stroke="#FFF1A0"
                stroke-width="2.24"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M43.0834 19.5V27.625C43.0834 32.5 39.1667 35.75 33.2917 35.75H14.9421C15.5492 35.3275 16.0779 34.8075 16.4892 34.2225C17.2138 33.2475 17.625 32.0938 17.625 30.875C17.625 27.2837 14.1196 24.375 9.79169 24.375C7.44169 24.375 5.34627 25.2362 3.91669 26.585V19.5C3.91669 15.08 7.12835 11.9925 12.1221 11.4725C12.6313 11.4075 13.16 11.375 13.7084 11.375H33.2917C33.8009 11.375 34.2904 11.3912 34.7604 11.4562C39.8129 11.9437 43.0834 15.0475 43.0834 19.5Z"
                stroke="#FFF1A0"
                stroke-width="2.24"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M43.0834 20.3125H37.2084C35.0542 20.3125 33.2917 21.775 33.2917 23.5625C33.2917 25.35 35.0542 26.8125 37.2084 26.8125H43.0834"
                stroke="#FFF1A0"
                stroke-width="2.24"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <form className="login" id="myForm">
            <select
              className="innerBox"
              id="selectNumber"
              onChange={selectAccount}
              defaultValue=""
              style={{ background: "white" }}>
              <option disabled value="">
                Choose an account
              </option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  saveAccount: PropTypes.func.isRequired, // Change PropTypes.node to PropTypes.func
};

export default Navbar;
