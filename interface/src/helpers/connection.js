import { moralis } from "./moralis"
import { useAuthStore } from "../stores/auth"

export const connection = {
  async connect(provider) {
    const authStore = useAuthStore()
    const user = await moralis.authenticate(provider)

    const authConstruct = {
      chainId: parseInt(moralis.getChainId(), 16),
      address: user.get("ethAddress"),
      connected: true,
      provider,
    }

    authStore.setAuthState(authConstruct)
  },
}
