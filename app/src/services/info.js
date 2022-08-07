import { config, tokens } from "../config"
import { moralis, subgraph, utils } from "../utils"
import { falcorABI, erc20ABI, priceAggregatorABI } from "../config/abi"

export class InfoService {
  async getOverviewData() {
    const tokens = await this.getTokensInfo()
    const poolsCount = await this.getDonationPoolsCount()
    const totalDeposit = tokens.reduce((a, b) => a + b.deposit * b.price, 0)
    const totalYield = tokens.reduce((a, b) => a + b.yield * b.price, 0)

    return { tokens, poolsCount, totalDeposit, totalYield }
  }

  async getTokensInfo() {
    const output = []
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      const [deposit, tokenYield, price] = await Promise.all([
        this.getTokenDeposit(token),
        this.getTokenYield(token),
        this.getTokenPrice(token),
      ])

      output.push({ ...token, yield: tokenYield, deposit, price })
    }

    return output
  }

  async getTokenDeposit(token) {
    const options = {
      type: "view",
      chain: "mumbai",
      method: "getTokenTotalBalance",
      address: config.falcor.address,
      abi: falcorABI,
      params: {
        _token: token.address,
      },
    }

    const balance = await moralis.invoke(options)
    return utils.formatUnits(balance, token.decimals)
  }

  async getTokenYield(token) {
    const options = {
      type: "view",
      chain: "mumbai",
      method: "getTokenTotalYield",
      address: config.falcor.address,
      abi: falcorABI,
      params: {
        _token: token.address,
      },
    }

    const balance = await moralis.invoke(options)
    return utils.formatUnits(balance, token.decimals)
  }

  async getTokenPrice(token) {
    const options = {
      type: "view",
      chain: "mumbai",
      method: "getLatestPrice",
      address: config.mumbai.priceAggregator,
      abi: priceAggregatorABI,
      params: {
        _aggregator: token.aggregator,
      },
    }

    const result = await moralis.invoke(options)
    return utils.formatUnits(result.price, result.decimals)
  }

  async getDonationPoolsCount() {
    const options = {
      type: "view",
      chain: "mumbai",
      method: "getDonationPoolsCount",
      address: config.falcor.address,
      abi: falcorABI,
      params: {},
    }

    const count = await moralis.invoke(options)
    return count
  }
}
