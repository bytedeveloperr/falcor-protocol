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

  async invokeContract({ type, chain, address, method, params, abi, msg } = {}) {
    if (type === "call") {
      const options = { chain, address, function_name: method, abi, params }
      return await Moralis.Web3API.native.runContractFunction(options)
    } else {
      const options = { contractAddress: address, functionName: method, msgValue: msg?.value, abi, params }
      return await Moralis.executeFunction(options)
    }
  },
}
