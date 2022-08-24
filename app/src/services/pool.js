import { config } from "../config";
import { moralis, subgraph, utils } from "../utils";
import { falcorABI, erc20ABI } from "../config/abi";
import { usePoolStore } from "../stores";

export class PoolService {
  constructor() {
    this.PoolObject = moralis.createObject("Pools", {});
  }

  createPool(input) {
    return new Promise(async (resolve) => {
      const options = {
        type: "write",
        address: config.falcor.address,
        abi: falcorABI,
        method: "createDonationPool",
        params: { _token: input.token, _beneficiary: input.beneficiary },
      };

      const tx = await moralis.invoke(options);
      const receipt = await tx.wait();
      const iface = new moralis.ethers.utils.Interface(falcorABI);

      for (let i = 0; i < receipt.logs.length; i++) {
        try {
          const log = receipt.logs[i];
          const data = iface.decodeEventLog("CreateDonationPool", log.data, log.topics);

          if (data.id && data.creator && data.token) {
            const pool = new this.PoolObject();
            pool.set("poolId", data.id.toString());
            pool.set("creator", data.creator);
            pool.set("name", input.name);
            pool.set("token", input.token);
            pool.set("beneficiary", input.beneficiary);
            pool.set("description", input.description);
            pool.set("category", input.category);
            await pool.save();

            resolve(data.id);

            break;
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  async updatePool(poolId, input) {
    const poolStore = usePoolStore();
    const query = moralis.query("Pools");
    query.equalTo("poolId", poolId);

    const pool = await query.first();

    pool.set("name", input.name);
    pool.set("description", input.description);
    pool.set("category", input.category);

    await pool.save();
    poolStore.updatePool(poolId, { name: input.name, description: input.description, category: input.category });
  }

  async updatePoolImage(poolId, path) {
    const poolStore = usePoolStore();
    const query = moralis.query("Pools");
    query.equalTo("poolId", poolId);

    const pool = await query.first();

    pool.set("image", path);

    await pool.save();
    poolStore.updatePool(poolId, { image: path });
  }

  async deposit(data) {
    const amount = utils.parseUnits(String(data.amount), data.token.decimals);

    const depositOptions = {
      type: "write",
      method: "deposit",
      address: config.falcor.address,
      abi: falcorABI,
      params: {
        _donationPoolId: utils.toBigNumber(data.poolId),
        _amount: amount,
      },
    };

    const deposit = await moralis.invoke(depositOptions);
    return await deposit.wait();
  }

  async withdraw(data) {
    const amount = utils.parseUnits(String(data.amount), data.token.decimals);

    const withdrawOptions = {
      type: "write",
      method: "withdraw",
      address: config.falcor.address,
      abi: falcorABI,
      params: {
        _donationPoolId: utils.toBigNumber(data.poolId),
        _amount: amount,
      },
    };

    const withdraw = await moralis.invoke(withdrawOptions);
    return await withdraw.wait();
  }

  async loadPools() {
    const poolStore = usePoolStore();
    const query = moralis.query("Pools");
    query.limit(10);

    const pools = await query.find();
    poolStore.setPools(await Promise.all(pools.map((pool) => this.#buildPool(pool))));
  }

  async loadPool(id, account) {
    const poolStore = usePoolStore();
    const query = moralis.query("Pools");
    query.equalTo("poolId", id);

    const pool = await query.first();
    poolStore.setCurrentpool(await this.#buildPool(pool, account));
  }

  async getPoolCurrentYield(poolId) {
    const yieldOptions = {
      type: "view",
      chain: "mumbai",
      method: "getDonationPoolYield",
      address: config.falcor.address,
      abi: falcorABI,
      params: {
        _donationPoolId: poolId,
      },
    };

    return await moralis.invoke(yieldOptions);
  }

  async #buildPool(pool, account) {
    if (!pool.attributes) return;

    const token = utils.getTokenDetails(pool.attributes.token);

    const data = {
      ...utils.copyObject(pool.attributes),
      ...(await subgraph.getDonationPool(pool.attributes.poolId)),
      yield: utils.formatUnits(await this.getPoolCurrentYield(pool.attributes.poolId), token.decimals * 2),
      token: token,
    };

    const depositor = utils.copyObject(await subgraph.getPoolDepositor(pool.attributes.poolId, account));
    data.depositor = { ...depositor, amount: utils.formatUnits(depositor.amount, token.decimals) };
    data.balance = utils.formatUnits(data.balance, token.decimals);

    return data;
  }

  async getPoolDepositors(poolId) {
    const depositors = await subgraph.getPoolDepositors(poolId);

    return depositors.map((depositor) => {
      const token = utils.getTokenDetails(depositor.pool.token);
      return { ...depositor, amount: utils.formatUnits(depositor.amount, token.decimals) };
    });
  }

  async getPoolDepositors(poolId) {
    const depositors = await subgraph.getPoolDepositors(poolId);

    let token;
    return depositors.map((depositor) => {
      if (!token) {
        token = utils.getTokenDetails(depositor.pool.token);
      }

      return { ...depositor, amount: utils.formatUnits(depositor.amount, token.decimals) };
    });
  }

  async getPoolTransactions(poolId) {
    const transactions = await subgraph.getPoolTransactions(poolId);

    let token;
    return transactions.map((transaction) => {
      if (!token) {
        token = utils.getTokenDetails(transaction.pool.token);
      }

      return { ...transaction, amount: utils.formatUnits(transaction.amount, token.decimals) };
    });
  }
}
