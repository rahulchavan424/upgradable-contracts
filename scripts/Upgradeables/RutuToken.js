async function RUTUToken() {

    let hre = require("hardhat");
    let fs = require("fs");
    let deployContract = "RUTU";
  
    const RUTU = await hre.ethers.getContractFactory("RUTU");
    const RUTUProxy = await hre.upgrades.deployProxy(RUTU, [], { initializer: "Initialize",kind: "uups" });
    await RUTUProxy.deployed();
  
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