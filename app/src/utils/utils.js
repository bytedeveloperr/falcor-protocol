import { tokens } from "../config";
import { moralis } from "./moralis";
import { BigNumber } from "@ethersproject/bignumber";
import * as date from "date-fns";

export const utils = {
  truncateEthAddress(address) {
    if (!address) return;

    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = address.match(truncateRegex);
    if (!match) return address;

    return `${match[1]}…${match[2]}`;
  },

  getTokenDetails(address) {
    if (!address) return;
    return tokens.find((token) => token.address.toLowerCase() === address.toLowerCase());
  },

  copyObject(obj) {
    if (typeof obj === "object") {
      const out = {};

      for (const k in obj) {
        out[k] = obj[k];
      }

      return out;
    }
  },

  parseUnits(value, decimals) {
    return moralis.ethers.utils.parseUnits(value, decimals);
  },

  formatUnits(value, decimals) {
    return moralis.ethers.utils.formatUnits(value, decimals);
  },

  toBigNumber(value) {
    return BigNumber.from(value);
  },

  formatDate(value) {
    return date.format(Number(value), "MMM d, yyyy h:m aa");
  },

  formatAmount(value, currency) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: currency ? "currency" : undefined,
      currency,
    });

    return formatter.format(Number(value));
  },
};
