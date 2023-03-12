require("@nomiclabs/hardhat-etherscan");


async function main() {
    const InstapCard = await ethers.getContractFactory("InstapCard");
 
    // Start deployment, returning a promise that resolves to a contract object
    const deployedContract = await InstapCard.deploy();
    console.log("Contract deployed to address:", deployedContract.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });