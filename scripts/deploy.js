const { ethers } = require("hardhat");

async function main() {
    const customNFT = await ethers.getContractFactory("CustomNFT");
    const cNFT = await customNFT.deploy();
    console.log("CustomNFT address:", cNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });