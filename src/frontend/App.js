import { React, useState } from "react";
import HomePage from "./components/HomePage";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Routes,
} from "react-router-dom";
import Asuki from "./components/Asuki";
import Wallet from "./components/Wallet"; // Import WalletContext
import Create from "./components/Create";
import Profile from "./components/Profile";
import NFTCreationForm from "./components/NFTCreationForm";
import Person from "./components/Person";
// eslint-disable-next-line

function App() {
  const [account, setAccount] = useState("");
  const saveAccount = (address) => {
    setAccount(address);
  };

  return (
    // /* Wrap your component tree inside the Wallet */
    <Wallet>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<HomePage saveAccount={saveAccount} account={account} />}
          />
          <Route
            path="/about/:idCollection"
            element={<Asuki saveAccount={saveAccount} account={account} />}
          />
          <Route
            path="/create"
            element={
              <NFTCreationForm saveAccount={saveAccount} account={account} />
            }
          />
          <Route
            path="/profile/:id"
            element={<Profile saveAccount={saveAccount} account={account} />}
          />
          <Route
            path="/person"
            element={<Person saveAccount={saveAccount} account={account} />}
          />
        </Routes>
      </Router>
    </Wallet>
  );
}

export default App;
