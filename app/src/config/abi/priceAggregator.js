export const priceAggregatorABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_aggregator",
        type: "address",
      },
    ],
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "int256",
        name: "price",
        type: "int256",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]
