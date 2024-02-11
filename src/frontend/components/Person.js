import React from "react";
import Navbar from "./Navbar";
import "./Person.css";
import nftimg from "../assets/NFT_Profile_Images/nft_img.png";
import arrowdown from "../assets/NFT_Profile_Images/arrow-down.png";
import desc_icon from "../assets/NFT_Profile_Images/textalign-left.png";
import textalign from "../assets/NFT_Profile_Images/textalign-left.png";
import verified1 from "../assets/NFT_Profile_Images/verified.png";
import profilepic from "../assets/profilepic.png";
import { useState, useRef, useEffect } from "react";
import Files from "./Files";
import axios from "axios";
import FormData from "form-data";
import trait_icon from "../assets/NFT_Profile_Images/tag-right.png";
import { WalletContext } from "./Wallet";
import { useContext } from "react";
const Person = ({ saveAccount, account, walletaddres }) => {
  const [traitContainerOpen, setTraitContainerOpen] = useState(true);
  const [listingContainerOpen, setListingContainerOpen] = useState(true);
  const [offerContainerOpen, setOfferContainerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [verified, setVerified] = useState(false);
  const { wallet } = useContext(WalletContext);

  // useEffect(() => {
  //   if (contractInstance) {
  //     // Fetch Events
  //     const fetchBoughtEvents = async () => {
  //       const events = await contractInstance.getPastEvents('Bought', {
  //         fromBlock: 0,
  //         toBlock: 'latest'
  //       });
  //       setBoughtEvents(events);
  //     };
  //     fetchBoughtEvents();
  //   }
  // }, [contractInstance]);
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const events = await wallet.contractMarketPlace.getPastEvents("Bought", {
      fromBlock: 0,
      toBlock: "latest",
    });
    // const results = await wallet.contractMarketPlace.events.Bought(null,null,null,null,null,account)
    console.log(events);

    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(
      events.map(async (i) => {
        // fetch arguments from each result
        i = i.returnValues;

        // get uri url from nft contract
        const uri = await wallet.contractNFT.methods.tokenURI(i.tokenId).call();
        // console.log(uri)

        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await wallet.contractMarketPlace.methods
          .getTotalPrice(i.itemId)
          .call();
        // define listed item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        return purchasedItem;
      })
    );
    setLoading(false);
    setPurchases(purchases);
    console.log(purchases);
  };
  useEffect(() => {
    loadPurchasedItems();
    fetch(`http://localhost:3001/check?email=${account}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data == "Verified") {
          setVerified(true);
        }
      });
  }, []);

  const toggleTraitContainer = () => {
    setTraitContainerOpen(!traitContainerOpen);
  };

  const toggleListingContainer = () => {
    setListingContainerOpen(!listingContainerOpen);
  };

  const toggleOfferContainer = () => {
    setOfferContainerOpen(!offerContainerOpen);
  };
  const [namer, setNamer] = useState("");

  const [name, setName] = useState("");

  const [cidMap, setCidMap] = useState({});
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [Checked, IsChecked] = useState("Not Verified");

  const inputFile = useRef(null);

  // const router = useRouter();
  // const data = router.query;
  const CheckUser = async (e) => {
    e.preventDefault();
    const cidd = cidMap[namer];
    if (cidd) {
      IsChecked("User Already Exists");
      console.log("User Already Exists");
      return;
    }
    console.log("Account", account);
    const response = await axios.post("http://localhost:3001/hello", { namer });
    if (
      response.data.status == "SUCCESS" &&
      response.data.kycResult.name == name
    ) {
      const res = await fetch("http://localhost:3001/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: account }),
      });
      const res_verify = await res.json();
      console.log(res_verify);
      if (res_verify == "Verified") {
        setVerified(true);
      }
      IsChecked("Verification Successful");
      try {
        setUploading(true);
        const formData = new FormData();
        const metadata = {
          pancard: namer,
          address: walletaddres,
        };
        const metadataString = JSON.stringify(metadata);

        const metadataBlob = new Blob([metadataString], {
          type: "application/json",
        });

        const metadataFile = new File([metadataBlob], "metadata.json");

        formData.append("file", metadataFile, { filename: namer });

        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOGMwZmU5ZS1hOTRmLTQxYmMtOTNkMi00NDBjNzkxZGJmNjEiLCJlbWFpbCI6ImF5dXNobG9oaWEyMzg2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyZGY2YzRkYTFkZjQwMzMzNWUwMCIsInNjb3BlZEtleVNlY3JldCI6IjRkNTUwMDRhMWI1YzI4NjRjYzg2ZDU1ZWU2NTc3ZGM1M2ZmNDRmNmQzYjdlOWZlZjFmNWY1Y2FiOTM4MTdiODkiLCJpYXQiOjE3MDAxNDI2MzF9.vy6a__mKpbRzZWxWZhWZy7aXy9zMa1KI9VxSv7mN8FE`}`,
            },
          }
        );
        // const res1 = await fetch("http://localhost:3001/hello", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ email: account }),
        // });
        // const res2 = await res1.json();
        // console.log(res2);
        console.log(res);
        const ipfsHash = res.data.IpfsHash;
        setCid(ipfsHash);
        setCidMap({ ...cidMap, [namer]: ipfsHash });
        setUploading(false);
      } catch (e) {
        console.log(e);
        setUploading(false);
        alert("Trouble uploading file");
      }
    }

    console.log(response.data);
  };

  const fetchData = async (name) => {
    try {
      const cidd = cidMap[name];
      if (!cidd) {
        console.log("Name not found");
        return;
      }

      const response = await axios.get(`https://ipfs.io/ipfs/${cidd}`);
      console.log(response.data);
      // setSongData(response.data);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    // uploadFile(e.target.files[0]);
  };
  const handlename = (e) => {
    setNamer(e.target.value);
  };
  return (
    <div className="person">
      <Navbar saveAccount={saveAccount} account={account} />
      <div className="container">
        <div className="Left">
          <div className="multiimage">
            {purchases.length > 0 ? (
              purchases.map((purchase, index) => (
                <div key={index}>
                  <img src={purchase.image} alt="" />
                </div>
              ))
            ) : (
              <div style={{ color: "white" }}>No purchase</div>
            )}
          </div>
          <div className="profile_desc">
            <img
              src={desc_icon}
              className="profile_desc_icon"
              alt="profile_desc_icon"
            />
            <p style={{ margin: "auto 0" }}>Description</p>
          </div>
          <div className="profile_trait_header" onClick={toggleTraitContainer}>
            <img
              src={trait_icon}
              className="profile_desc_icon"
              alt="profile_desc_icon"
            />
            <p style={{ margin: "auto 0" }}>Traits</p>
          </div>
          <div
            className={`profile_trait_container ${
              traitContainerOpen ? "open" : ""
            }`}>
            <div className="profile_trait_tag">
              <p>BACKGROUND</p>
              <p>
                <b>Off White B</b> 18%
              </p>
              <p>Floor : 7.3799 ETH</p>
            </div>
            <div className="profile_trait_tag">
              <p>BACKGROUND</p>
              <p>
                <b>Off White B</b> 18%
              </p>
              <p>Floor : 7.3799 ETH</p>
            </div>
            <div className="profile_trait_tag">
              <p>BACKGROUND</p>
              <p>
                <b>Off White B</b> 18%
              </p>
              <p>Floor : 7.3799 ETH</p>
            </div>
            <div className="profile_trait_tag">
              <p>BACKGROUND</p>
              <p>
                <b>Off White B</b> 18%
              </p>
              <p>Floor : 7.3799 ETH</p>
            </div>
          </div>
        </div>

        <div className="Right">
          <div className="info">
            <div className="per-img">
              <img
                src={profilepic}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div className="name_profile">
              <h3>Asuki</h3>
              {verified && <img src={verified1} alt="" />}
            </div>
            <p>{account}</p>
            <p>
              Owned By <span style={{ color: "#fff1a0" }}>dm-on twitter</span>
            </p>
            <p>Joined on</p>
            <p>2024</p>
            {/* <div className="id">0x3elln8x2c4rxc45</div> */}
            {verified ? (
              <>
                <p className="person_verify_text">Verified</p>
                <p className="person_verify_text">Uploaded to Ipfs</p>
              </>
            ) : (
              <>
                <button className="verify" onClick={CheckUser}>
                  Verify
                </button>

                <input
                  type="text"
                  id="name"
                  value={namer}
                  onChange={handlename}
                  placeholder="Pan-Number"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />

                <div style={{}}>{Checked}</div>
                {cid && (
                  <div className="file-list">
                    Uploaded to IPFS
                    {/* <Files cid={cid} /> */}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="option">
            <ul>
              <li>
                Items
                <img src={arrowdown} alt="" />
              </li>
              <li>
                Offers Made
                <img src={arrowdown} alt="" />
              </li>
              <li>
                Deals
                <img src={arrowdown} alt="" />
              </li>
              <li>
                Created
                <img src={arrowdown} alt="" />
              </li>
              <li>
                Favourites
                <img src={arrowdown} alt="" />
              </li>
              <li>
                Activity
                <img src={arrowdown} alt="" />
              </li>
              <li>
                More
                <img src={textalign} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
