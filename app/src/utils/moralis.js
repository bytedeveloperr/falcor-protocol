import { Moralis } from "moralis";
import { config } from "../config";
import { connectionService } from "../services";

export const moralis = {
  async initialize() {
    await Moralis.start({ serverUrl: config.moralis.serverUrl, appId: config.moralis.appId });
    await Moralis.enableWeb3();

    moralis.setupListeners();
  },

  async authenticate({ current, provider } = {}) {
    let user;
    if (!!current) {
      user = await Moralis.User.currentAsync();
    }

    user = await Moralis.authenticate({ provider });
    moralis.setupListeners();

    return user;
  },

  getChainId() {
    return Moralis.getChainId();
  },

  async invoke({ type, chain, address, method, params, abi, msg } = {}) {
    if (type === "view") {
      const options = { chain, address, function_name: method, abi, params };
      return await Moralis.Web3API.native.runContractFunction(options);
    } else if (type === "write") {
      const options = { contractAddress: address, functionName: method, msgValue: msg?.value, abi, params };
      return await Moralis.executeFunction(options);
    }

    throw new Error(`Invalid contract invocation type ${type}`);
  },

  createObject(name, options) {
    return Moralis.Object.extend(name, options);
  },

  query(object) {
    return new Moralis.Query(object);
  },

  get ethers() {
    return Moralis.web3Library;
  },

  setupListeners() {
    Moralis.onChainChanged((chainId) => connectionService.updateChainId(chainId));
    Moralis.onAccountChanged(() => connectionService.connect(connectionService.state.provider));
    Moralis.onDisconnect(() => connectionService.disconnect());
  },
};
