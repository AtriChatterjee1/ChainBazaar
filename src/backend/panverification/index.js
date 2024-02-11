const express = require("express");
// const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
url =
  "mongodb+srv://wallet:wallet@cluster0.tmzvicw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
app.use(cors());
app.use(bodyParser.json());
app.post("/hello", (req, res) => {
  // data = {
  //   kycStatus: "SUCCESS",
  //   status: "SUCCESS",
  //   message: "PAN details retrived successfully.",
  //   kycResult: {
  //     idNumber: "CVJPC1693P",
  //     idStatus: "VALID",
  //     category: "INDIVIDUAL OR PERSON",
  //     name: "ATRI CHATTOPADHYAY",
  //   },
  //   responseKey: "success_pan",
  //   responseCode: "S00000",
  //   requestTimestamp: "2024-02-06 16:59:37.037555 IST (GMT +0530)",
  //   responseTimestamp: "2024-02-06 16:59:37.237867 IST (GMT +0530)",
  //   decentroTxnId: "46A547A82941486EA6B55E0313839D7E",
  // };

  // res.json(data);
  const axios = require("axios");
  const { namer, name, a } = req.body;
  const options = {
    method: "POST",
    url: "https://in.staging.decentro.tech/kyc/public_registry/validate",
    headers: {
      accept: "application/json",
      client_id: "Metaskyabc_2_sop",
      client_secret: "e495ae49de234152aa7ad4dccb5728ac",
      module_secret: "1ef725d3f5584c3a8b1af07c037196f1",
      "content-type": "application/json",
    },
    data: {
      reference_id: "0000-0000-0000-2005",
      document_type: "PAN",
      id_number: namer,
      consent: "Y",
      consent_purpose: "For bank account purpose only",
    },
  };

  axios
    .request(options)
    .then(async function (response) {
      // console.log("new req received");
     data = response.data;
      // if (data.kycStatus == "SUCCESS") {
      //   await client.connect().then(async () => {
      //     console.log("Connected successfully to server");
      //     console.log("I am here registering");
      //     const database = client.db("app-data");
      //     const users = database.collection("emaillists");
      //     await users.insertOne({
      //       email: email,
      //     });
      //   });
      // }
      res.json(data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// const dotenv =require("dotenv");
// dotenv.config();

// const url = process.env.URI;

// const client = new MongoClient(url,connectionParams);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/addtolist", async (req, res) => {
  // console.log("req received");
  await client
    .connect()
    .then(async () => {
      console.log("Connected successfully to server");
      console.log("I am here registering");
      const database = client.db("app-data");
      const users = database.collection("emaillists");
      console.log(req.body);
      const { email } = req.body;
      const dupemail = email;

      const existingUser = await users.findOne({ email: dupemail });
      console.log(existingUser);

      if (existingUser) {
        // res.json({ message: "User already exists" });
        return res.json("Verified");
      }

      client.close();
      return res.status(201).send({ message: "YES" });
    })
    .catch((err) => {
      console.log(err);
      client.close();
      return res.status(500).send({ message: err.message });
    });
});

app.post("/verify", async (req, res) => {
  console.log("req received");
  await client
    .connect()
    .then(async () => {
      // console.log("Connected successfully to server");
      // console.log("I am here registering");
      const database = client.db("app-data");
      const users = database.collection("emaillists");
      // console.log(req.body);
      const { email } = req.body;
      console.log(email);
      const checkUser = await users.findOne({ email: email });
      // console.log(checkUser);
      if (!checkUser) {
        await users.insertOne({
          email: email,
        });
        console.log("new account verified");
      }

      console.log("KYC Success email stored");

      client.close();
      return res.json("Verified");
    })
    .catch((err) => {
      console.log(err);
      client.close();
      return res.status(500).send({ message: err.message });
    });
});

app.get("/check", async (req, res) => {
  console.log("req received");
  await client
    .connect()
    .then(async () => {
      // console.log("Connected successfully to server");
      // console.log("I am here registering");
      const database = client.db("app-data");
      const users = database.collection("emaillists");
      // console.log(req.body);
      const { email } = req.query;
      console.log(email);
      const checkUser = await users.findOne({ email: email });
      // console.log(checkUser);
      if (!checkUser) {
        return res.json("Not Verified");
      }
      console.log("sab badhiya hai");
      client.close();
      return res.json("Verified");
    })
    .catch((err) => {
      console.log(err);
      client.close();
      return res.status(500).send({ message: err.message });
    });
});
