const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Custom NFT contract", function() {

    it("Deployment should success", async function() {
        const customNFT = await ethers.getContractFactory("CustomNFT");
        
        const hardhatCNFT = await customNFT.deploy();

        const nftName = await hardhatCNFT.name();
        expect(nftName).to.equal("CustomNFT")

        const nftSymbol = await hardhatCNFT.symbol();
        expect(nftSymbol).to.equal("CFT");
    });

    it("Mint 1 token to addr1", async function() {
        const [addr1] = await ethers.getSigners();

        const customNFT = await ethers.getContractFactory("CustomNFT");
        
        const hardhatCNFT = await customNFT.deploy();

        await hardhatCNFT.mint(addr1.address);

        const addr1TokenBalance = await hardhatCNFT.balanceOf(addr1.address);
        expect(addr1TokenBalance).to.equal(1);
    })
});