import { BigInt } from "@graphprotocol/graph-ts"
import { CreateDonationPool, DonationPoolDeposit, DonationPoolWithdrawal } from "../generated/Sling/Sling"
import { DonationPool, Depositor, Transaction } from "../generated/schema"
import { decrementDepositPoolBalance, incrementDepositPoolBalance } from "./utils"

export function handleCreateDonationPool(event: CreateDonationPool): void {
  let pool = DonationPool.load(event.params.id.toString())

  if (!pool) {
    pool = new DonationPool(event.params.id.toString())

    pool.balance = BigInt.fromI32(0)
    pool.creator = event.params.creator
    pool.beneficiary = event.params.beneficiary
    pool.token = event.params.token
    pool.depositorsCount = BigInt.fromI32(0)
  }

  pool.save()
}

export function handleDonationPoolDeposit(event: DonationPoolDeposit): void {
  const transaction = new Transaction(event.transaction.hash)
  transaction.type = "Deposit"
  transaction.amount = event.params.amount
  transaction.account = event.params.account
  transaction.pool = event.params.poolId.toString()
  transaction.timestamp = event.block.timestamp
  transaction.save()

  const depositorId = event.params.account
    .toHexString()
    .concat("_")
    .concat(event.params.poolId.toString())

  let depositor = Depositor.load(depositorId)
  if (!depositor) {
    depositor = new Depositor(depositorId)
    depositor.address = event.params.account
    depositor.amount = BigInt.fromI32(0)
    depositor.pool = event.params.poolId.toString()
  }

  depositor.amount = depositor.amount.plus(event.params.amount)
  depositor.save()

  incrementDepositPoolBalance(event)
}

export function handleDonationPoolWithdrawal(event: DonationPoolWithdrawal): void {
  const transaction = new Transaction(event.transaction.hash)
  transaction.type = "Withdrawal"
  transaction.amount = event.params.amount
  transaction.account = event.params.account
  transaction.pool = event.params.poolId.toString()
  transaction.timestamp = event.block.timestamp
  transaction.save()

  const depositorId = event.params.account
    .toHexString()
    .concat("_")
    .concat(event.params.poolId.toString())

  const depositor = Depositor.load(depositorId)
  if (depositor) {
    depositor.amount = depositor.amount.minus(event.params.amount)
    depositor.save()
  }

  decrementDepositPoolBalance(event)
}
