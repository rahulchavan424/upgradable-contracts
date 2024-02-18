// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract RUTU is Initializable, UUPSUpgradeable, ERC20Upgradeable, OwnableUpgradeable {
    mapping(address=>bool) public isClaimed;
    uint256 maxSupply;
    uint256 claimAmount;

    event Claim(address user,uint256 amount,uint256 timestamp);


     function Initialize() public initializer{
        __ERC20_init("RUTU", "RUTU");
        __Ownable_init();
        maxSupply = 1600000000 * 10 ** decimals();
        claimAmount = 250* 10 ** decimals();
        _mint(msg.sender,400000000 * 10 ** decimals());
    }

    function setClaimTokens(uint256 _claimAmount) external onlyOwner
    {
        claimAmount = _claimAmount;
    }

    function claimTokens(uint256 _amount) public{
        require(_amount<=claimAmount,"Amount Exceeds");
        require(totalSupply()+_amount <= maxSupply, "Max supply reached");
        _mint(msg.sender, _amount);
        isClaimed[msg.sender] = true;
        emit Claim(msg.sender,_amount,block.timestamp);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner{}
}