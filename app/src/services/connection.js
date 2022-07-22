import { moralis } from "../utils"
import { useConnectionStore } from "../stores/connection"

export class ConnectionService {
  get state() {
    const connectionStore = useConnectionStore()
    return connectionStore.$state
  }

  async connect(provider) {
    const connectionStore = useConnectionStore()

    const user = await moralis.authenticate({ provider })
    connectionStore.saveConnection({ address: user.get("ethAddress"), chainId: moralis.getChainId(), provider })
  }

  async disconnect(provider) {
    const connectionStore = useConnectionStore()
    connectionStore.removeConnection()
  }
}
