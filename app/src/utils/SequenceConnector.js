// import { AbstractWeb3Connector } from "moralis";
// import { sequence } from "./sequence";

// export class SequenceConnector extends AbstractWeb3Connector {
//   constructor() {
//     super();

//     this.type = "sequence";
//   }

//   async activate(options) {
//     try {
//       await this.deactivate();
//     } catch (error) {}

//     await sequence.wallet.connect(options);
//     this.provider = sequence.wallet.getProvider();

//     if (!this.provider) {
//       throw new Error("Could not connect with Sequence, error in connecting to provider");
//     }

//     const accounts = await this.provider.listAccounts();

//     this.account = accounts[0];
//     this.chainId = await this.provider.getChainId();
//     console.log(this.chainId);

//     this.subscribeToEvents(this.provider);

//     return { provider: this.provider, account: this.account, chainId: this.chainId };
//   }

//   async deactivate() {
//     this.unsubscribeToEvents(this.provider);

//     try {
//       if (window) {
//         window.localStorage.removeItem("sequenceconnect");
//       }
//     } catch (error) {}

//     this.account = null;
//     this.chainId = null;

//     if (this.provider) {
//       try {
//         await this.provider.disconnect();
//       } catch {}
//     }
//   }
// }
