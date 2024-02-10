import { useState, useRef } from "react";
import Files from "./Files";
import axios from "axios";
import FormData from "form-data";

export default function Login({ walletaddres }) {
  const [namer, setNamer] = useState("");

  const [name, setName] = useState("");

  const [cidMap, setCidMap] = useState({});
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [Checked, IsChecked] = useState("nhi pela");

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

    const response = await axios.post("http://localhost:3001/hello", { namer });
    if (
      response.data.status == "SUCCESS" &&
      response.data.kycResult.name == name
    ) {
      IsChecked("Pela hai");
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
  console.log(walletaddres);
  return (
    <>
      <main>
        <div className="hero-background">
          <div className="container">
            <div className="hero">
              <div className="copy">
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  id="name"
                  value={namer}
                  onChange={handlename}
                />
                <div>{walletaddres}</div>
                <div style={{}}>{Checked}</div>

                <div className="flex-btns">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />

                  <button onClick={() => fetchData(name)}>Fetch Data</button>

                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={CheckUser}>
                    CheckUser
                  </button>
                  {/* <button
                    disabled={uploading}
                    onClick={() => inputFile.current.click()}
                    className="btn"
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button> */}
                </div>
                {cid && (
                  <div className="file-list">
                    <Files cid={cid} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
