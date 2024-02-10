import React from "react";
import "./Body.css";
import Container2 from "./Container2";
import Menu2 from "./Menu2";
import Container3 from "./Container3";

const Body = ({ nft }) => {
  return (
    <main>
      <div
        className="container1"
        style={{ backgroundImage: `url(${nft?.collection?.bannerImageUrl})` }}>
        <div className="info_nft">
          <div>
            <div className="name">
              <div className="name1">
                <div>{nft?.collection?.name}&nbsp; </div>
                <div>
                  <svg
                    width="2rem"
                    height="2rem"
                    viewBox="0 0 50 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M48.8905 21.8576L45.4903 17.9074C44.8403 17.1573 44.3153 15.7572 44.3153 14.7572V10.5069C44.3153 7.85674 42.1401 5.6816 39.4899 5.6816H35.2397C34.2646 5.6816 32.8395 5.15657 32.0895 4.50653L28.1392 1.10632C26.4141 -0.368773 23.589 -0.368773 21.8389 1.10632L17.9136 4.53153C17.1636 5.15657 15.7385 5.6816 14.7634 5.6816H10.4381C7.78798 5.6816 5.61285 7.85674 5.61285 10.5069V14.7822C5.61285 15.7572 5.08782 17.1573 4.46278 17.9074L1.08757 21.8826C-0.362522 23.6077 -0.362522 26.4079 1.08757 28.133L4.46278 32.1082C5.08782 32.8583 5.61285 34.2584 5.61285 35.2334V39.5087C5.61285 42.1589 7.78798 44.334 10.4381 44.334H14.7634C15.7385 44.334 17.1636 44.859 17.9136 45.5091L21.8639 48.9093C23.589 50.3844 26.4141 50.3844 28.1642 48.9093L32.1145 45.5091C32.8645 44.859 34.2646 44.334 35.2647 44.334H39.5149C42.1651 44.334 44.3403 42.1589 44.3403 39.5087V35.2584C44.3403 34.2834 44.8653 32.8583 45.5153 32.1082L48.9155 28.158C50.3656 26.4329 50.3656 23.5827 48.8905 21.8576ZM35.3897 20.2825L23.3139 32.3583C22.9639 32.7083 22.4889 32.9083 21.9889 32.9083C21.4888 32.9083 21.0138 32.7083 20.6638 32.3583L14.6134 26.3079C13.8884 25.5828 13.8884 24.3828 14.6134 23.6577C15.3385 22.9327 16.5385 22.9327 17.2636 23.6577L21.9889 28.383L32.7395 17.6323C33.4646 16.9073 34.6646 16.9073 35.3897 17.6323C36.1147 18.3574 36.1147 19.5575 35.3897 20.2825Z"
                      fill="#FFF1A0"
                    />
                  </svg>
                </div>
              </div>
              <div className="name2">{nft?.name}</div>
            </div>
          </div>

          <div className="data1">
            <div className="volume">
              <div className="volume1">{nft?.contract?.totalSupply}ETH</div>
              <div className="volume2">Total Volume</div>
            </div>
            <div className="floor">
              <div className="floor1">
                {nft?.contract?.openSeaMetadata?.floorPrice}ETH
              </div>
              <div className="floor2">Floor Price</div>
            </div>
            <div className="listed">
              <div className="listed1">1%</div>
              <div className="listed2">Listed</div>
            </div>
            <div className="owner">
              <div className="owner1">4140(41%)</div>
              <div className="owner2">Owners(Unique)</div>
            </div>
          </div>
        </div>
      </div>
      <Container2 />
      <Menu2 />
      <Container3 />
    </main>
  );
};

export default Body;
