import { Moralis } from "moralis"
import { networks } from "../config/networks"

export const moralis = {
  async initialize() {
    const serverUrl = "https://8onheax1fkyg.usemoralis.com:2053/server"
    const appId = "HqhAOSocJfxCc4J01ASckPs0K511LXMlVOOXfymr"

    Moralis.start({ serverUrl, appId })
  },

  async authenticate(provider) {
    if (provider) {
      return await Moralis.authenticate({
        provider: provider !== "injected" ? provider : undefined,
        chainId: networks.mumbai.chainId,
      })
    }

    return await Moralis.User.currentAsync()
  },

  getChainId() {
    return Moralis.chainId
  },
}
