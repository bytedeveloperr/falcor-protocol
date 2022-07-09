import { useLocalStorage } from "@vueuse/core"
import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => useLocalStorage("auth", { connected: null, address: null, provider: null, chainId: null }),

  actions: {
    setAuthState(data) {
      this.$state = { ...this.$state, ...data }
    },
  },
})
