import { Moralis } from "moralis"

export const moralis = {
  async initialize() {
    const serverUrl = "https://8onheax1fkyg.usemoralis.com:2053/server"
    const appId = "HqhAOSocJfxCc4J01ASckPs0K511LXMlVOOXfymr"

    await Moralis.start({ serverUrl, appId })
    await Moralis.enableWeb3()
  },

  async authenticate({ current, provider } = {}) {
    if (!!current) {
      return await Moralis.User.currentAsync()
    }

    return await Moralis.authenticate({ provider })
  },

  getChainId() {
    return Moralis.getChainId()
  },

  async invoke({ type, chain, address, method, params, abi, msg } = {}) {
    if (type === "view") {
      const options = { chain, address, function_name: method, abi, params }
      return await Moralis.Web3API.native.runContractFunction(options)
    } else if (type === "write") {
      const options = { contractAddress: address, functionName: method, msgValue: msg?.value, abi, params }
      return await Moralis.executeFunction(options)
    }

    throw new Error(`Invalid contract invocation type ${type}`)
  },

  createObject(name, options) {
    return Moralis.Object.extend(name, options)
  },

  query(object) {
    return new Moralis.Query(object)
  },

  get ethers() {
    return Moralis.web3Library
  },
}
