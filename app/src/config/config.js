const env = import.meta.env;

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
  moralis: {
    appId: env.VITE_MORALIS_APP_ID,
    serverUrl: env.VITE_MORALIS_SERVER_URL,
  },
};
