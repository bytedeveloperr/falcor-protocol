import { moralis } from "../utils";
import { erc20ABI } from "../config/abi";

export class TokenService {
  async getAllowance(data) {
    const allowanceOptions = {
      type: "view",
      chain: "mumbai",
      method: "allowance",
      address: data.token,
      abi: erc20ABI,
      params: {
        _owner: data.account,
        _spender: data.spender,
      },
    };

    return await moralis.invoke(allowanceOptions);
  }

  async getBalance(data) {
    const balanceOptions = {
      type: "view",
      chain: "mumbai",
      method: "balanceOf",
      address: data.token,
      abi: erc20ABI,
      params: {
        _owner: data.account,
      },
    };

    return await moralis.invoke(balanceOptions);
  }

  async approve(data) {
    const approveOptions = {
      type: "write",
      method: "approve",
      address: data.token,
      abi: erc20ABI,
      params: {
        _owner: data.account,
        _spender: data.spender,
        _value: data.amount,
      },
    };

    return await moralis.invoke(approveOptions);
  }
}
