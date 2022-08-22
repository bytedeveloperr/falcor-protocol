import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useConnectionStore = defineStore({
  id: "connection",

  state: () => useLocalStorage("connection", { address: null, connected: null, provider: null, chainId: null }),

  actions: {
    saveConnection({ address, provider, chainId } = {}) {
      this.$state = { ...this.$state, connected: true, address, provider, chainId };
    },

    removeConnection() {
      this.$state = { address: null, connected: null, provider: null, chainId: null };
    },

    setChainId(chainId) {
      this.chainId = chainId;
    },
  },
});
