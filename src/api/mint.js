const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');


require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy App URL
const API_KEY = process.env.API_KEY;

console.log(ethers.providers)
// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)

// Get contract ABI file
const contract = require("../../InstapCardAbi.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x1da04911282a0fd8f0b6cbe0831c97ec58afe2d7'

// Create a contract instance
const NftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://instap.mypinata.cloud/ipfs/QmP7uKtQQ7aEnfp38HFr5KRyZJNKv1gdVsCDqigc6hMK7t"

// Call mintNFT function
const mintNFT = async (address) => {
    let nftTxn = await NftContract.safeMint(address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! https://goerli.etherscan.io/tx/${nftTxn.hash}`)
    return nftTxn.hash;
}

router.post('/', (req, res) => {
  if(!req.body.address || !ethers.utils.isAddress(req.body.address)){
    res.status(502);
    res.json({
      message: "error, invalid address"
    });
    return;
  }
  mintNFT(req.body.address)
    .then((hash) => {
      res.json({
        message: "success",
        hash: hash
      });
    })
    .catch((error) => {
        console.error(error);
        middlewares.errorHandler(error, req, res);
    });
});



module.exports = router;
