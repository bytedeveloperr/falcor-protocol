const env = import.meta.env

export const config = {
  app: {
    name: env.VITE_APP_NAME,
  },
  falcor: {
    address: env.VITE_FALCOR_CONTRACT_ADDRESS,
  },
  mumbai: {
    explorer: env.VITE_MUMBAI_EXPLORER_URL,
    priceAggregator: env.VITE_PRICE_AGGREGATOR_MUMBAI,
  },
}
