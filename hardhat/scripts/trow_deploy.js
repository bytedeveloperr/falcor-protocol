const hre = require("hardhat")

async function main() {
  const Trow = await hre.ethers.getContractFactory("Trow")
  const trow = await Trow.deploy()

  await trow.deployed()

  console.log("Trow deployed to:", trow.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
