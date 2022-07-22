import { DonationPool } from "../generated/schema"
import { DonationPoolDeposit, DonationPoolWithdrawal } from "../generated/Sling/Sling"

export function incrementDepositPoolBalance(event: DonationPoolDeposit): void {
  const pool = DonationPool.load(event.params.poolId.toString())

  if (pool) {
    pool.balance = pool.balance.plus(event.params.amount)
    pool.save()
  }
}

export function decrementDepositPoolBalance(event: DonationPoolWithdrawal): void {
  const pool = DonationPool.load(event.params.poolId.toString())

  if (pool) {
    pool.balance = pool.balance.minus(event.params.amount)
    pool.save()
  }
}
