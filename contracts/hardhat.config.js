require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");


const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  etherscan: {
    apiKey: "5QI9EKCI2R263WY8G2V77X494FFX8P8H15",
  },
   solidity: "0.8.9",
   defaultNetwork: "goerli",
   settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
   },
   networks: {
      hardhat: {},
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   }
}