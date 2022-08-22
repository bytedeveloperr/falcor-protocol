import { ConnectionService } from "./connection";
import { PoolService } from "./pool";
import { InfoService } from "./info";
import { TokenService } from "./token";

export const connectionService = new ConnectionService();
export const tokenService = new TokenService();
export const poolService = new PoolService();
export const infoService = new InfoService();
