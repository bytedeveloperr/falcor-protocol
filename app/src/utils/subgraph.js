import { gql, slingSubgraphClient } from "./index"

export const subgraph = {
  async getDonationPool(poolId) {
    let query = gql`
      query GetDonationPool($poolId: ID!) {
        donationPool(id: $poolId) {
          id
          token
          creator
          balance
        }
      }
    `

    const response = await slingSubgraphClient.query({ query, variables: { poolId } })
    return response.data.donationPool || { id: 0, token: "0x0", creator: "0x0", balance: "0" }
  },

  async getPoolDepositor(poolId, depositor) {
    let query = gql`
      query GetDepositor($depositorId: String) {
        depositor(id: $depositorId) {
          id
          address
          amount
        }
      }
    `

    const depositorId = `${depositor}_${poolId}`
    const response = await slingSubgraphClient.query({ query, variables: { depositorId } })
    return response.data.depositor || { id: "", address: "0x0", amount: "0" }
  },

  async getPoolDepositors(poolId) {
    let query = gql`
      query GetDepositors($poolId: String) {
        depositors(where: { pool: $poolId }) {
          id
          address
          amount
          pool {
            id
            token
          }
        }
      }
    `

    const response = await slingSubgraphClient.query({ query, variables: { poolId } })
    return response.data.depositors || []
  },

  async getPoolTransactions(poolId) {
    let query = gql`
      query GetTransactions($poolId: String) {
        transactions(where: { pool: $poolId }) {
          id
          type
          amount
          account
          timestamp
          pool {
            id
            token
          }
        }
      }
    `

    const response = await slingSubgraphClient.query({ query, variables: { poolId } })
    return response.data.transactions || []
  },
}
