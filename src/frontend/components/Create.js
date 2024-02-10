import { useContext, useState } from "react";
import { Wallet, ethers } from "ethers";
import { Row, Form, Button } from "react-bootstrap";
import { WalletContext } from "./Wallet";
import axios from "axios";
const FormData = require("form-data");
// require("dotenv").config();

// const JWT = process.env.PINATA_JWT;

const Create = ({ saveAccount, account }) => {
  const { wallet, setWallet } = useContext(WalletContext);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  console.log(wallet.contractMarketPlace)



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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}>
          <h1 style={{ color: "white" }}>
            Wait till you are not seen completed in console
          </h1>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={pinFileToIPFS}
              />
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                required
                as="textarea"
                placeholder="Description"
              />
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                required
                type="number"
                placeholder="Price in ETH"
              />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
