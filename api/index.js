const express = require("express");
const { ethers } = require("hardhat");
const app = express();
app.use(express.json());

const abi = require("../artifacts/contracts/nft.sol/CustomNFT.json").abi;

async function mintNFT(to) {
    // Add the logic of sending tx of "mint(to)" here.

    // Prepare the "provider".
    const httpProvider = new ethers.providers.JsonRpcProvider();

    // Get the "owner" to sign the transaciton.
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const wallet = new ethers.Wallet(privateKey, httpProvider);


    // Prepare the "Contract"
    const contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contract = new ethers.Contract(contractAddr, abi, httpProvider);
    // console.log(await contract.balanceOf(to));

    // Bind the wallet(signer) to the contract.
    const contractWithSigner = contract.connect(wallet);
    try {
        const tx = await contractWithSigner.mint(to);
        console.log(tx);
    } catch (e) {
        console.log(e);
    }
}

app.post("/mint", async (req, res) => {
    const to = req.body.to;
    console.log(to);
    // Send the mint tx to the Ethereum.
    await mintNFT(to);
    res.json("mint post");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});