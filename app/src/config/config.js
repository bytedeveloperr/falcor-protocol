const env = import.meta.env;

export const config = {
  nullAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  web3StorageToken: env.VITE_WEB3_STORAGE_TOKEN,
  ipfsGateway: env.VITE_IPFS_GATEWAY,
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
  chains: {
    80001: "mumbai",
  },
};
