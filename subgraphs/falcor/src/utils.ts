import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { DepositToken, DonationPool } from "../generated/schema"
import { DonationPoolDeposit, DonationPoolWithdrawal } from "../generated/Sling/Sling"

export function incrementDepositPoolBalance(event: DonationPoolDeposit): void {
  const pool = DonationPool.load(event.params.poolId.toString())

  if (pool) {
    pool.balance = pool.balance.plus(event.params.amount)
    pool.depositorsCount = pool.depositorsCount.plus(BigInt.fromI32(1))
    pool.save()

    incrementDepositTokenBalance(pool.token, event.params.amount)
  }
}

export function decrementDepositPoolBalance(event: DonationPoolWithdrawal): void {
  const pool = DonationPool.load(event.params.poolId.toString())

  if (pool) {
    pool.balance = pool.balance.minus(event.params.amount)
    pool.save()

    decrementDepositTokenBalance(pool.token, event.params.amount)
  }
}

export function incrementDepositTokenBalance(token: Bytes, amount: BigInt): void {
  let depositToken = DepositToken.load(token)

  if (!depositToken) {
    depositToken = new DepositToken(token)
    depositToken.amount = BigInt.fromI32(0)
  }

  depositToken.amount = depositToken.amount.plus(amount)
  depositToken.save()
}

export function decrementDepositTokenBalance(token: Bytes, amount: BigInt): void {
  const depositToken = DepositToken.load(token)

  if (depositToken) {
    depositToken.amount = depositToken.amount.minus(amount)
    depositToken.save()
  }
}
