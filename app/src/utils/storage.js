import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import { config } from "../config";

const web3Storage = new Web3Storage({ token: config.web3StorageToken });

export const storage = {
  async upload(file) {
    const cid = await web3Storage.put([file]);
    return cid;
  },
};
