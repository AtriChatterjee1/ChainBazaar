import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Network, Alchemy } from "alchemy-sdk";
// import Menu from "./Menu";
// import Hero from "./Hero";
import Navbar from "./Navbar";
import Body from "./Asuki_comp/Body";
const Asuki = ({ saveAccount, account }) => {
  let { idCollection } = useParams();

  const [nft, setNft] = useState([]);
  const settings = {
    apiKey: "6RxnHVm0v3lAtHdx2HSVq_MGhhxtxtyo", // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  // Print total NFT collection returned in the response:
  useEffect(() => {
    const fetchNft = async () => {
      try {
        const result = await alchemy.nft.getNftsForContract(
          "0x61fce80d72363b731425c3a2a46a1a5fed9814b2"
        );
        setNft(result.nfts[idCollection]);
        // console.log(result.nfts[idCollection]);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNft();
  }, [idCollection]);
  return (
    <div>
      <Navbar saveAccount={saveAccount} account={account} />
      <Body nft={nft} saveAccount={saveAccount} account={account} />
      {/* <Hero /> */}
      {/* <Menu /> */}
    </div>
  );
};

export default Asuki;
