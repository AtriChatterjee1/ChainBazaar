// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// Setup: npm install alchemy-sdk
import { Network, Alchemy } from "alchemy-sdk";
import { useState, useEffect } from "react";

import nft1 from "../assets/1.jpg";
import nft2 from "../assets/2.jpg";
import nft3 from "../assets/3.jpg";
import nft4 from "../assets/4.jpg";
import nft5 from "../assets/5.jpg";
import nft6 from "../assets/6.jpg";
import nft7 from "../assets/7.jpg";
import nft8 from "../assets/8.jpg";
import nft9 from "../assets/9.jpg";
import nft10 from "../assets/10.png";
import nft11 from "../assets/11.jpg";
import nft12 from "../assets/12.jpg";
import { NavLink } from "react-router-dom";
const Menu = () => {
  const [nfts, setNfts] = useState([]);
  const settings = {
    apiKey: "6RxnHVm0v3lAtHdx2HSVq_MGhhxtxtyo", // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  // Print total NFT collection returned in the response:
  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const result = await alchemy.nft.getNftsForContract(
          "0x61fce80d72363b731425c3a2a46a1a5fed9814b2"
        );
        setNfts(result.nfts);
        console.log(result.nfts);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNfts();
  }, []);

  return (
    <div className="menu">
      <header>
        <ul>
          <li>
            <a href="#">All</a>
          </li>
          <li>
            <a href="#">Art</a>
          </li>
          <li>
            <a href="#">Gaming</a>
          </li>
          <li>
            <a href="#">Memberships</a>
          </li>
          <li>
            <a href="#">PFPs</a>
          </li>
          <li>
            <a href="#">Photography</a>
          </li>
          <li>
            <a href="#">Music</a>
          </li>
        </ul>
      </header>

      <div className="options">
        <div className="filter1">
          <ul>
            <li>
              <a href="#">Trending</a>
            </li>
            <li>
              <a href="#">Top</a>
            </li>
          </ul>
        </div>
        <div className="filter2">
          <ul>
            <li>
              <a href="#">1hr</a>
            </li>
            <li>
              <a href="#">6hr</a>
            </li>
            <li>
              <a href="#">24hr</a>
            </li>
            <li>
              <a href="#">7d</a>
            </li>
          </ul>
        </div>
        <div className="filter3">
          <p>All Chains</p>
        </div>
        <div className="filter4">
          <p>View All</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none">
            <path
              d="M26.9029 12.2805H17.5499H9.12778C7.68655 12.2805 6.96594 14.0219 7.98681 15.0428L15.7634 22.8194C17.0095 24.0655 19.0362 24.0655 20.2823 22.8194L23.2398 19.8619L28.0589 15.0428C29.0648 14.0219 28.3441 12.2805 26.9029 12.2805Z"
              fill="#001E52"
            />
          </svg>
        </div>
      </div>

      <div className="lists">
        <div className="left-list">
          <div className="heading">
            <ul>
              <li>Rank</li>
              <li>Collection</li>
              <li>Name</li>
              <li>Floor Price</li>
              <li>Volume</li>
            </ul>
          </div>
          <hr></hr>
          {/* Generating list items dynamically */}
          {nfts.slice(0, 5).map((nft, index) => (
            <NavLink
              to={{
                // next task here to send this item as props as here we have loaded everything other was pass URI to know more about that item
                pathname: `/about/${index}`,
              }}>
              <div key={index} className="list-item">
                <p>{index + 1}</p>
                <img src={nft.image.cachedUrl} alt="" />
                <p>{nft.collection.name}</p>
                <p>{nft.name}</p>
                <p>{nft.contract.openSeaMetadata.floorPrice}</p>
                <p>{nft.contract.totalSupply}</p>
              </div>
            </NavLink>
          ))}
        </div>

        <div className="righr-list">
          <div className="heading">
            <ul>
              <li>Rank</li>
              <li>Collection</li>
              <li>Name</li>
              <li>Floor Price</li>
              <li>Volume</li>
            </ul>
          </div>
          <hr></hr>
          {/* Generating list items dynamically */}
          {nfts.slice(5, 10).map((nft, index) => (
            <NavLink
              to={{
                // next task here to send this item as props as here we have loaded everything other was pass URI to know more about that item
                pathname: `/about/${index}`,
              }}>
              <div key={index} className="list-item">
                <p>{index + 6}</p>
                <img src={nft.image.cachedUrl} alt="" />
                <p>{nft.collection.name}</p>
                <p>{nft.name}</p>
                <p>{nft.contract.openSeaMetadata.floorPrice}</p>
                <p>{nft.contract.totalSupply}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
