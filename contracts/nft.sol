// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CustomNFT is ERC721{
    uint public tokenId = 0;
    
    constructor() ERC721('CustomNFT', 'CFT'){}

    function mint(address _to ) public returns(bool){

        // Increase the token ID
        tokenId += 1;

        // Process of minting a NFT token to "_to" address.
        _mint(_to, tokenId);


        return true;
    }
}