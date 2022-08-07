import { ConnectionService } from "./connection"
import { PoolService } from "./pool"
import { InfoService } from "./info"

export const connectionService = new ConnectionService()
export const poolService = new PoolService()
export const infoService = new InfoService()
