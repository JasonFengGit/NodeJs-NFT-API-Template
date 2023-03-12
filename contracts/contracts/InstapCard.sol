// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract InstapCard is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(address => bool) isAdmin;

    constructor() ERC721("InstapCard", "INSC") {
        isAdmin[msg.sender] = true;
    }

    bool locked = false;

    function setLocked(bool _locked) external onlyAdmin {
        locked = _locked;
    }

    // overide to support soul bound
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        require(!locked, "Soul Bound.");
    }

    modifier onlyAdmin()
    {
        require(isAdmin[msg.sender], "Admins only.");
        _;
    }

    function addAdmin(address account) public onlyOwner{
        isAdmin[account] = true;
    }

    function removeAdmin(address account) public onlyOwner{
        isAdmin[account] = false;
    }

    function safeMint(address to, string memory uri) public onlyAdmin {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}