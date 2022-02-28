const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Custom NFT contract", function() {

    it("Deployment should success", async function() {
        // Prepare the test context.
        const customNFT = await ethers.getContractFactory("CustomNFT");
        const hardhatCNFT = await customNFT.deploy();

        // Check if the contract name is "CustomNFT".
        const nftName = await hardhatCNFT.name();
        expect(nftName).to.equal("CustomNFT")

        // Check if the contract symbol is "CFT".
        const nftSymbol = await hardhatCNFT.symbol();
        expect(nftSymbol).to.equal("CFT");
    });

    it("Mint 1 token to addr1", async function() {
        // Prepare the test context.
        const [addr1] = await ethers.getSigners();
        const customNFT = await ethers.getContractFactory("CustomNFT");
        const hardhatCNFT = await customNFT.deploy();

        // Try the "mint" operation.
        await hardhatCNFT.mint(addr1.address);

        // Check if the NFT is minted to "addr1".
        const addr1TokenBalance = await hardhatCNFT.balanceOf(addr1.address);
        expect(addr1TokenBalance).to.equal(1);
    })
});