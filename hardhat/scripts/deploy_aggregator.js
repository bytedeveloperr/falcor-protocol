const hre = require("hardhat")

async function main() {
  const PriceAggregator = await hre.ethers.getContractFactory("PriceAggregator")
  const priceAggregator = await PriceAggregator.deploy()

  await priceAggregator.deployed()
  console.log("PriceAggregator deployed to:", priceAggregator.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
