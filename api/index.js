// Import modules.
const express = require("express");
const { ethers } = require("hardhat");

// Contract params.
const contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractAbi = require("../artifacts/contracts/nft.sol/CustomNFT.json").abi;
const walletPrivKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// Prepare the context for NFT mint - ethers contract instance 
function mintNFTContext() {
     // Prepare the "provider".
     const httpProvider = new ethers.providers.JsonRpcProvider();

     // Prepare the "owner" wallet to sign the transaciton.
     const wallet = new ethers.Wallet(walletPrivKey, httpProvider);
 
     // Prepare the "Contract"
     const contract = new ethers.Contract(contractAddr, contractAbi, httpProvider);
 
     // Bind the wallet(signer) to the contract.
     const contractWithSigner = contract.connect(wallet);

     return contractWithSigner;
}

async function mintNFT(to) {
    const contractWithSigner = mintNFTContext();
    try {
        const tx = await contractWithSigner.mint(to);
        console.log(tx);
    } catch (e) {
        console.error(e);
    }
}


/* ------------  Express App Body  --------------- */
const app = express();
app.use(express.json());

app.post("/mint", async (req, res) => {
    // Validation 1. Validate the wallet address.
    if (
        !req.body.to || 
        !ethers.utils.isAddress(req.body.to)
    ) {
        res.status(401).json({error: "Invalid address"});
    }

    // Main body.
    try {
        await mintNFT(req.body.to);
        res.status(200).send("Mint success");
    } catch (e) {
        // console.error(e);
        res.status(401).json({error: "Mint failed"});
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
/* ------------------------------------------------ */