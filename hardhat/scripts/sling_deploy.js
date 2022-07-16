const hre = require("hardhat")

async function main() {
  const Sling = await hre.ethers.getContractFactory("Sling")
  const sling = await Sling.deploy(
    "0x5343b5bA672Ae99d627A1C87866b8E53F47Db2E6",
    "0x2a58E9bbb5434FdA7FF78051a4B82cb0EF669C17"
  )

  await sling.deployed()

  console.log("Sling deployed to:", sling.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
