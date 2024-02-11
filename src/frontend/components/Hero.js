// in this it is creating error if the address in wallet is not loaded solve this!

import { useContext, useState, useEffect } from "react";
import { WalletContext } from "./Wallet";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from "react-bootstrap";

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
import loader from "../assets/loadernew.gif";

// function renderSoldItems(items) {
//   return (
//     <>
//       <h2>Sold</h2>
//       <Row xs={1} md={2} lg={4} className="g-4 py-3">
//         {items.map((item, idx) => (
//           <Col key={idx} className="overflow-hidden">
//             <Card>
//               <Card.Img variant="top" src={item.image} />
//               <Card.Footer>
//                 For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved {ethers.utils.formatEther(item.price)} ETH
//               </Card.Footer>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </>
//   )
// }
const Hero = ({ account }) => {
  const { wallet } = useContext(WalletContext);
  const [loading, setLoading] = useState(true);
  const [loadingWait, setLoadingWait] = useState(true);
  const [items, setItems] = useState([]);
  // const { contractNFT,contractMarketPlace } = useContext(WalletContext);

  // console.log(wallet);
  // console.log(wallet.contractMarketPlace);

  const loadMarketplaceItems = async () => {
    if (!wallet || !wallet.contractMarketPlace || !wallet.contractNFT) {
      // If wallet or contracts are not loaded, return early or handle the error as needed
      console.error("Wallet or contract instances not available");
      return;
    }
    // console.log("start")
    // Load all  items
    const itemCount = await wallet.contractMarketPlace.methods
      .itemCount()
      .call();
    console.log(itemCount);
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await wallet.contractMarketPlace.methods.items(i).call();
      // console.log(item)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await wallet.contractNFT.methods
          .tokenURI(item.tokenId)
          .call();
        // console.log(uri)
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // // get total price of item (item price + fee)
        const totalPrice = await wallet.contractMarketPlace.methods
          .getTotalPrice(item.itemId)
          .call();

        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          id: i,
        });

        // console.log(items)
      }
    }
    setLoading(false);
    setItems(items);
  };

  // const buyMarketItem = async (item) => {
  //   await (await wallet.contractMarketPlace.methods.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
  //   loadMarketplaceItems()
  // }

  // loadMarketplaceItems();

  useEffect(() => {
    loadMarketplaceItems();
  }, [account]);

  if (loading)
    return (
      <div className="boxes">
        <div className="hero">
          {wallet && (
            <p style={{ color: "white", fontSize: "1.25rem" }}>
              <img
                src={loader}
                style={{ display: "block", margin: "1vh auto" }}
              />
              Make sure you have connected your wallet
            </p>
          )}
          {!wallet && <p style={{ color: "white" }}>Loading</p>}
        </div>
      </div>
    );
  return (
    <div className="hero">
      {/* below are sample images may not load due to src error */}
      {/* <div className="boxes">
    {Array.from({ length: 12 }, (_, index) => (
      <div className="block" key={index}>
        <img src={nft${index+1}} alt="" />
      </div>
    ))}
  </div> */}
      <div className="boxes">
        {items.map((item, idx) => (
          <div className="block" key={idx}>
            <NavLink
              to={{
                // next task here to send this item as props as here we have loaded everything other was pass URI to know more about that item
                pathname: `/profile/${item.id}`,
              }}>
              <img src={item.image} alt="" />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
