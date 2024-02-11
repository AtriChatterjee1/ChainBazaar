import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NFTCreationForm.css"; // Make sure to create a CSS file with this name
import Header from "./NFTcreation_comp/Header";
import { useContext } from "react";
import { WalletContext } from "./Wallet";
import axios from "axios";
import NFTloader from "../assets/MIntNFT.gif";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NFTCreationForm = ({ saveAccount, account }) => {
  const { wallet, setWallet } = useContext(WalletContext);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Function to fetch balance
  async function fetchBalance(address) {
    try {
      // Get balance in Wei
      const balanceWei = await wallet.web3.eth.getBalance(address);

      // Convert balance from Wei to Ether and truncate to 3 decimal places
      const balanceEth = parseFloat(
        wallet.web3.utils.fromWei(balanceWei, "ether")
      ).toFixed(3);

      return balanceEth;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
    }
  }

  fetchBalance(account)
    .then((balance) => {
      // console.log('User balance:', balance, 'ETH');
      setBalance(balance);
    })
    .catch((error) => {
      console.error("Failed to fetch balance:", error);
    });

  const pinFileToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const pinataMetadata = JSON.stringify({
          name: "File name",
        });
        formData.append("pinataMetadata", pinataMetadata);
        const pinataOptions = JSON.stringify({
          cidVersion: 0,
        });
        formData.append("pinataOptions", pinataOptions);
        const result = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNDg0NWUzOS00MDRkLTQ5ZGQtODU0Mi04NzE1N2YwNGU2NWMiLCJlbWFpbCI6InJqcm9oYWsyMDAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlZDczZDAzNWUwYjMxNGU3NjFiMCIsInNjb3BlZEtleVNlY3JldCI6IjY0YWRkYTFiZTI0M2RmNGFkNzZkNThkYTVmMGJjZjA4ZTQ4MTM5MTk0MjVkNGRkY2VhNjVlMjQ1Yzc5NDBiMDkiLCJpYXQiOjE3MDc0Nzk0NDJ9.JJJi364pbtnmQForSxLZhbDVq9n6CCT1oXTp7y_t2tA`}`,
            },
          }
        );
        console.log(result);
        setImage(`https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };
  const createNFT = async () => {
    setLoading(true);
    console.log(image, price, name, description);
    if (!image || !price || !name || !description) return;
    try {
      const data = JSON.stringify({
        pinataContent: {
          name: name,
          description: description,
          price: price,
          image: image,
        },
        pinataMetadata: {
          name: "metadata.json",
        },
      });
      const result = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNDg0NWUzOS00MDRkLTQ5ZGQtODU0Mi04NzE1N2YwNGU2NWMiLCJlbWFpbCI6InJqcm9oYWsyMDAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlZDczZDAzNWUwYjMxNGU3NjFiMCIsInNjb3BlZEtleVNlY3JldCI6IjY0YWRkYTFiZTI0M2RmNGFkNzZkNThkYTVmMGJjZjA4ZTQ4MTM5MTk0MjVkNGRkY2VhNjVlMjQ1Yzc5NDBiMDkiLCJpYXQiOjE3MDc0Nzk0NDJ9.JJJi364pbtnmQForSxLZhbDVq9n6CCT1oXTp7y_t2tA`}`,
          },
        }
      );
      mintThenList(result);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };
  const mintThenList = async (result) => {
    try {
      console.log(wallet.contractNFT);
      console.log(wallet.contractMarketPlace);
      const uri = `https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}`;
      // mint nft
      console.log(account);
      await wallet.contractNFT.methods
        .mint(`https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}`)
        .send({
          from: account,
          gas: 480000,
        });
      // get tokenId of new nft
      const id = await wallet.contractNFT.methods.tokenCount().call();
      const contractMarketPlaceAddress = wallet.contractMarketPlace._address;
      console.log(contractMarketPlaceAddress);
      const contractNFTAddress = wallet.contractNFT._address;

      console.log(id);
      // approve marketplace to spend nft
      await wallet.contractNFT.methods
        .setApprovalForAll(contractMarketPlaceAddress, true)
        .send({
          from: account,
          gas: 480000,
        });
      // add nft to marketplace
      const listingPrice = ethers.utils.parseEther(price.toString());
      await wallet.contractMarketPlace.methods
        .makeItem(contractNFTAddress, id, listingPrice)
        .send({
          from: account,
          gas: 480000,
        });

      console.log("completed");
      setLoading(false);
      toast.success("NFT Minted Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    pinFileToIPFS(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic
  };
  console.log(balance);
  return (
    <>
      <div>
        <div>
          <Header balanceWallet={balance} />
        </div>
        <div className="nft-creation-form">
          {!loading ? (
            <form onSubmit={handleSubmit}>
              {image == "" ? (
                <div className="media-drop-area">
                  <input type="file" onChange={handleFileChange} />
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24">
                      <path
                        d="M10 9h-6l8-9 8 9h-6v11h-4v-11zm11 11v2h-18v-2h-2v4h22v-4h-2z"
                        fill="white"
                      />
                    </svg>
                  </p>
                  <p>Drag and drop media</p>
                  <p>Browse files</p>
                  <p>Max size: 50MB</p>
                  <p>JPG, PNG, GIF, SVG, MP4</p>
                </div>
              ) : (
                <div className="media-drop-area">
                  <img
                    src={image}
                    alt="uploaded nft"
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
              )}
              <div>
                {/* <div className="formfill">
        <label for="nameImput">Collection *</label>
        <button onClick={() => {}} className="newcollection">
          Create a new collection
        </button>
      </div> */}
                <div>
                  <label for="nameImput">Name *</label>
                  <input
                    className="nft-info"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Name your NFT"
                    required
                  />
                </div>
                <div>
                  <label for="nameImput">Price *</label>
                  <input
                    className="nft-info"
                    type="number"
                    placeholder="Price in ETH"
                    onChange={handlePriceChange}
                    min={1}
                    // Additional logic would be needed to handle changing supply values
                  />
                </div>
                <div>
                  <label for="nameImput">Description *</label>
                  <textarea
                    className="nft-info"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter a description"
                  />
                </div>
                <div>
                  <button onClick={createNFT} className="submit">
                    Create & List NFT
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className="nftform_nftloader_div">
                <img src={NFTloader} className="nftloader_gif" />
                <p className="nftloader_text">
                  Loading Creativity: Minting Moments into NFTs....
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NFTCreationForm;
