async function RUTUToken() {

    let hre = require("hardhat");
    let fs = require("fs");
    let deployContract = "RUTU";
    let deployedContract = require("../../Deployments/" + deployContract + ".json");
  
    console.log("previous Deployment: ", deployedContract);
  
    const RUTUUpgrade = await hre.ethers.getContractFactory("RUTUUpgrade");
    const RUTUProxy = await hre.upgrades.upgradeProxy(deployedContract.RUTUAddress, RUTUUpgrade);
  
    console.log("New : ", {
      RUTUAddress: RUTUProxy.address,
    });
  
    deployedContractData = {
        RUTUAddress: RUTUProxy.address,
    };
  
    fs.writeFileSync("./Deployments/" + deployContract + ".json", JSON.stringify(deployedContractData));
  
}
  
RUTUToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });  