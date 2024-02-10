import { useState, createContext } from "react";
import PropTypes from "prop-types";
const WalletContext = createContext();

const Wallet = ({ children }) => {
  const [wallet, setWallet] = useState({
    web3: null,
    contractMarketPlace: null,
    contractNFT: null,
  });

  return (
    <>
      <WalletContext.Provider value={{ wallet, setWallet }}>
        {children}
      </WalletContext.Provider>
    </>
  );
};

Wallet.propTypes = {
  children: PropTypes.node.isRequired,
};
export { WalletContext };
export default Wallet;
