import React, { useState,useContext,useEffect } from 'react';
import Navbar from './Navbar';
import './Profile.css';
import { useParams } from "react-router-dom";
// import nft from '../assets/NFT_Profile_Images/Frame 61.png';
import nft2 from '../assets/NFT_Profile_Images/nft2.jpg';
import trait_icon from '../assets/NFT_Profile_Images/tag-right.png';
import desc_icon from '../assets/NFT_Profile_Images/textalign-left.png';
import listing_icon from '../assets/NFT_Profile_Images/listing.png';
import up from '../assets/NFT_Profile_Images/arrow-up.png';
import down from '../assets/NFT_Profile_Images/arrow-down.png';
import offer_tag from '../assets/NFT_Profile_Images/offer.png';
import verified from '../assets/NFT_Profile_Images/verified.png';
import { WalletContext } from './Wallet';
const Profile = ({saveAccount,account}) => {
  const {wallet} = useContext(WalletContext);
  const [traitContainerOpen, setTraitContainerOpen] = useState(true);
  const [listingContainerOpen, setListingContainerOpen] = useState(true);
  const [descContainerOpen, setdescContainerOpen] = useState(true);
  const [offerContainerOpen, setOfferContainerOpen] = useState(false);
  const [item, setItem] = useState({
    totalPriceEth: 0,
    itemId: -1,
    seller: -1,
    name: "Loading..",
    description: "Loading..",
    image: nft2,
    totalPriceDollar: 0, // Assign default value here
    totalPriceRupee: 0, // Assign default value here
    sold : true
    });
  const toggleTraitContainer = () => {
    setTraitContainerOpen(!traitContainerOpen);
  };

  const toggleListingContainer = () => {
    setListingContainerOpen(!listingContainerOpen);
  };
  const toggleDescContainer =()=> {
    setdescContainerOpen(!descContainerOpen);
  };

  const toggleOfferContainer = () => {
setOfferContainerOpen(!offerContainerOpen);
  }

  let { id } = useParams();


  const loadItem = async ()=>{
    if (!wallet || !wallet.contractMarketPlace || !wallet.contractNFT) {
      // If wallet or contracts are not loaded, return early or handle the error as needed
      console.error("Wallet or contract instances not available");
      return;
    }


    const itemMarket =  await wallet.contractMarketPlace.methods.items(id).call();
    // console.log(itemMarket)
    if (!itemMarket.sold) {
      // get uri url from nft contract
      const uri = await wallet.contractNFT.methods.tokenURI(itemMarket.tokenId).call();
      // const owner = await wallet.contractNFT.methods.owenerOf(itemMarket.tokenId).call();
      // console.log(uri)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      // // get total price of item (item price + fee)
      const totalPrice = await wallet.contractMarketPlace.methods.getTotalPrice(itemMarket.itemId).call();
      const totalPriceEth = wallet.web3.utils.fromWei(totalPrice, 'ether');
      const etherToRupeeRate = 150000; // Assume 1 ETH = 150,000 Rupees
const etherToDollarRate = 2000; // Assume 1 ETH = 2000 Dollars

      // Convert total price to Rupees and Dollars
      const totalPriceRupee = totalPriceEth * etherToRupeeRate;
      const totalPriceDollar = totalPriceEth * etherToDollarRate;
      // Add item to items array
      const item =({
        totalPrice,
        totalPriceEth,
        itemId: itemMarket.itemId,
        seller: itemMarket.seller,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        totalPriceDollar,
        totalPriceRupee,
        sold : itemMarket.sold
        // owner
      })

      setItem(item);
      
      console.log(item)
    }
  }
   

 

  const buyNFT = async () => {
    try {
      
        await wallet.contractMarketPlace.methods.purchaseItem(item.itemId).send({
          from: account,
          value: item.totalPrice,
          gas: 480000,
        })

        console.log("complete buy");
       loadItem();
        

      
    } catch (error) {
      console.log("error in buying ", error);
    }
  };

  useEffect(() => {
    loadItem()
  }, [account,item])

  console.log(id);

  

  return (
    <div>
    <Navbar saveAccount={saveAccount} account={account}/>
    <div>
     {(!item.sold)?
     
      <div className='profile_main_div'>
        <div className='profile_main_left'>
        <div className='profile_nft_img_container'>
        <div className='profile_nft_img_blur_top'></div>
        <img src={item.image} className='profile_nft_img' alt='nft2'/>
        <p className='profile_nft_img_text_1'>{item.name} <img src={verified} className='profile_verified_icon' alt='verified'/></p>
        <p className='profile_nft_img_text'>{item.name} #8675</p>
        <div className='profile_nft_img_blur_bottom'></div>
        </div>
         
          <div className='profile_desc'>
            <img src={desc_icon} className='profile_desc_icon' alt='profile_desc_icon'  onClick={toggleDescContainer}/>
            <p style={{"margin":"auto 0"}}>Description</p>
          
          </div>
          <div className='profile_desc'>
          <p>{item.description}</p>
          </div>
          <div className='profile_trait_header' onClick={toggleTraitContainer}>
            <img src={trait_icon} className='profile_desc_icon' alt='profile_desc_icon'/>
            <p style={{"margin":"auto 0"}}>Traits</p>
          </div>
          <div className={`profile_trait_container ${traitContainerOpen ? 'open' : ''}`}>
            <div className='profile_trait_tag'>
            <p>BACKGROUND</p> 
            <p><b>Off White B</b> 18%</p> 
            <p>Floor : 7.3799 ETH</p>
            </div>
            <div className='profile_trait_tag'>
            <p>BACKGROUND</p> 
            <p><b>Off White B</b> 18%</p> 
            <p>Floor : 7.3799 ETH</p>
            </div>
            <div className='profile_trait_tag'>
            <p>BACKGROUND</p> 
            <p><b>Off White B</b> 18%</p> 
            <p>Floor : 7.3799 ETH</p>
            </div>
            <div className='profile_trait_tag'>
            <p>BACKGROUND</p> 
            <p><b>Off White B</b> 18%</p> 
            <p>Floor : 7.3799 ETH</p>
            </div>
          </div>
        </div>
        <div className='profile_main_right'>
          <div className='profile_sale_container'>
            <p><b>Sale</b> ends 26th January 2024 at 0:22 pm</p>
            <div className='profile_sale_time_div'>
              <p className='profile_sale_time'>05 <br/>Hours</p>
              <p className='profile_sale_time'>05 <br/>Minutes</p>
              <p className='profile_sale_time'>05 <br/>Seconds</p>
            </div>
          </div>
          <div className='profile_buy_sell'>
            <p>Current Price</p>
            <p className='profile_buy_sell_price'><span className='profile_buy_sell_eth'>{item.totalPriceEth} ETH</span> <span className='profile_buy_sell_dollar'>${item.totalPriceDollar}</span> <span className='profile_buy_sell_dollar'>₹{item.totalPriceRupee}</span></p>
            <div className='profile_btn_div'>
              <button className='profile_buy_btn' onClick={buyNFT}>Buy now</button>
              <div className='profile_buy_sell_line'></div>
              <button className='profile_offer_btn'>Make Offer</button>
            </div>
          </div>
          <div className='profile_listing_header' onClick={toggleListingContainer}>
            <img src={listing_icon} className='listing_icon' alt='listing_icon'/>
            Listings
            <img src={listingContainerOpen ? up : down} className='profile_arrow-up' alt='arrow_up'/>
          </div>
          <div className={`profile_listing_container ${listingContainerOpen ? 'open_listing_container' : ''}`}>
            {listingContainerOpen&& `Not Available!`}
          </div>
          <div className='profile_listing_header' onClick={toggleOfferContainer}>
            <img src={offer_tag} className='listing_icon' alt='listing_icon'/>
           Offers
            <img src={offerContainerOpen ? up : down} className='profile_arrow-up' alt='arrow_up'/>
          </div>
          <div className={`profile_listing_container ${offerContainerOpen ? 'open_listing_container' : ''}`}>
            {offerContainerOpen&& `Not Available!`}
          </div>
        </div>
      </div>
    :
      <div className='profile_main_div' style={{color:"white"}}> Item Sold</div>}
    </div>
    </div>
  );
};

export default Profile;