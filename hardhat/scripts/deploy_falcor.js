const hre = require("hardhat");

const poolRegistry = "0x5343b5bA672Ae99d627A1C87866b8E53F47Db2E6";
const wethGateway = "0x2a58E9bbb5434FdA7FF78051a4B82cb0EF669C17";
const registryAddress = "0x369404c5291c191eda9efa0071566ac3c2c515e9";
const interval = 300;

async function main() {
  // const TokensRegistry = await hre.ethers.getContractFactory("TokensRegistry")
  // const tokensRegistry = await TokensRegistry.deploy()

  // await tokensRegistry.deployed()
  // console.log("TokensRegistry deployed to:", tokensRegistry.address)

  const Falcor = await hre.ethers.getContractFactory("Falcor");
  const falcor = await Falcor.deploy(poolRegistry, registryAddress, wethGateway, interval);

  await falcor.deployed();
  console.log("Falcor deployed to:", falcor.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
