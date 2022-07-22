import { env } from "../config/env"
import { moralis, subgraph, utils } from "../utils"
import { slingABI, erc20ABI } from "../config/abi"

export class PoolService {
  constructor() {
    this.PoolObject = moralis.createObject("Pools", {})
  }

  async createPool(input) {
    const options = {
      type: "write",
      address: env.sling.address,
      abi: slingABI,
      method: "createDonationPool",
      params: { _token: input.token },
    }

    const tx = await moralis.invoke(options)
    const receipt = await tx.wait()
    const iface = new moralis.ethers.utils.Interface(slingABI)

    for (let i = 0; i < receipt.logs.length; i++) {
      const log = receipt.logs[i]
      const data = iface.decodeEventLog("CreateDonationPool", log.data, log.topics)

      if (data.id && data.creator && data.token) {
        const pool = new this.PoolObject()
        pool.set("poolId", data.id.toString())
        pool.set("creator", data.creator)
        pool.set("name", input.name)
        pool.set("token", input.token)
        pool.set("description", input.description)
        pool.set("category", input.category)
        await pool.save()

        break
      }
    }
  }

  async deposit(data) {
    const amount = utils.parseUnits(String(data.amount), data.token.decimals)
    const allowanceOptions = {
      type: "view",
      chain: "mumbai",
      method: "allowance",
      address: data.token.address,
      abi: erc20ABI,
      params: {
        _owner: data.account,
        _spender: env.sling.address,
      },
    }
    const allowance = await moralis.invoke(allowanceOptions)

    if (utils.toBigNumber(allowance).lt(amount)) {
      const approveOptions = {
        type: "write",
        method: "approve",
        address: data.token.address,
        abi: erc20ABI,
        params: {
          _owner: data.account,
          _spender: env.sling.address,
          _value: amount,
        },
      }

      const approve = await moralis.invoke(approveOptions)
      await approve.wait()
    }

    const depositOptions = {
      type: "write",
      method: "deposit",
      address: env.sling.address,
      abi: slingABI,
      params: {
        _donationPoolId: utils.toBigNumber(data.poolId),
        _amount: amount,
      },
    }

    const deposit = await moralis.invoke(depositOptions)
    return await deposit.wait()
  }

  async withdraw(data) {
    const amount = utils.parseUnits(String(data.amount), data.token.decimals)

    // const allowanceOptions = {
    //   type: "view",
    //   chain: "mumbai",
    //   method: "allowance",
    //   address: data.token.address,
    //   abi: erc20ABI,
    //   params: {
    //     _owner: data.account,
    //     _spender: env.sling.address,
    //   },
    // }
    // const allowance = await moralis.invoke(allowanceOptions)

    // if (utils.toBigNumber(allowance).lt(amount)) {
    //   const approveOptions = {
    //     type: "write",
    //     method: "approve",
    //     address: data.token.address,
    //     abi: erc20ABI,
    //     params: {
    //       _owner: data.account,
    //       _spender: env.sling.address,
    //       _value: amount,
    //     },
    //   }

    //   const approve = await moralis.invoke(approveOptions)
    //   await approve.wait()
    // }

    const withdrawOptions = {
      type: "write",
      method: "withdraw",
      address: env.sling.address,
      abi: slingABI,
      params: {
        _donationPoolId: utils.toBigNumber(data.poolId),
        _amount: amount,
      },
    }

    const withdraw = await moralis.invoke(withdrawOptions)
    return await withdraw.wait()
  }

  async getPools() {
    const query = moralis.query("Pools")
    query.limit(10)

    const pools = await query.find()
    return await Promise.all(pools.map((pool) => this.#buildPool(pool)))
  }

  async getPool(id, account) {
    const query = moralis.query("Pools")
    query.equalTo("poolId", id)

    const pool = await query.first()
    return await this.#buildPool(pool, account)
  }

  async getPoolCurrentYield(poolId) {
    const yieldOptions = {
      type: "view",
      chain: "mumbai",
      method: "getDonationPoolYieldBalance",
      address: env.sling.address,
      abi: slingABI,
      params: {
        _donationPoolId: poolId,
      },
    }

    return await moralis.invoke(yieldOptions)
  }

  async #buildPool(pool, account) {
    if (!pool.attributes) return

    const token = utils.getTokenDetails(pool.attributes.token)

    const data = {
      ...utils.copyObject(pool.attributes),
      ...(await subgraph.getDonationPool(pool.attributes.poolId)),
      yield: utils.formatUnits(await this.getPoolCurrentYield(pool.attributes.poolId), token.decimals),
      token: token,
    }

    const depositor = utils.copyObject(await subgraph.getPoolDepositor(pool.attributes.poolId, account))
    data.depositor = { ...depositor, amount: utils.formatUnits(depositor.amount, token.decimals) }
    data.balance = utils.formatUnits(data.balance, token.decimals)

    return data
  }

  async getPoolDepositors(poolId) {
    const depositors = await subgraph.getPoolDepositors(poolId)

    return depositors.map((depositor) => {
      const token = utils.getTokenDetails(depositor.pool.token)
      return { ...depositor, amount: utils.formatUnits(depositor.amount, token.decimals) }
    })
  }

  async getPoolDepositors(poolId) {
    const depositors = await subgraph.getPoolDepositors(poolId)

    let token
    return depositors.map((depositor) => {
      if (!token) {
        token = utils.getTokenDetails(depositor.pool.token)
      }

      return { ...depositor, amount: utils.formatUnits(depositor.amount, token.decimals) }
    })
  }

  async getPoolTransactions(poolId) {
    const transactions = await subgraph.getPoolTransactions(poolId)

    let token
    return transactions.map((transaction) => {
      if (!token) {
        token = utils.getTokenDetails(transaction.pool.token)
      }

      return { ...transaction, amount: utils.formatUnits(transaction.amount, token.decimals) }
    })
  }
}
