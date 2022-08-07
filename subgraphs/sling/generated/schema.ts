// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class DepositToken extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));

    this.set("amount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DepositToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type DepositToken must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DepositToken", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): DepositToken | null {
    return changetype<DepositToken | null>(
      store.get("DepositToken", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class DonationPool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("token", Value.fromBytes(Bytes.empty()));
    this.set("creator", Value.fromBytes(Bytes.empty()));
    this.set("beneficiary", Value.fromBytes(Bytes.empty()));
    this.set("balance", Value.fromBigInt(BigInt.zero()));
    this.set("depositorsCount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DonationPool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DonationPool must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DonationPool", id.toString(), this);
    }
  }

  static load(id: string): DonationPool | null {
    return changetype<DonationPool | null>(store.get("DonationPool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token(): Bytes {
    let value = this.get("token");
    return value!.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    return value!.toBytes();
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get beneficiary(): Bytes {
    let value = this.get("beneficiary");
    return value!.toBytes();
  }

  set beneficiary(value: Bytes) {
    this.set("beneficiary", Value.fromBytes(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value!.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get depositorsCount(): BigInt {
    let value = this.get("depositorsCount");
    return value!.toBigInt();
  }

  set depositorsCount(value: BigInt) {
    this.set("depositorsCount", Value.fromBigInt(value));
  }

  get depositors(): Array<string> | null {
    let value = this.get("depositors");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set depositors(value: Array<string> | null) {
    if (!value) {
      this.unset("depositors");
    } else {
      this.set("depositors", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Depositor extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool", Value.fromString(""));
    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Depositor entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Depositor must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Depositor", id.toString(), this);
    }
  }

  static load(id: string): Depositor | null {
    return changetype<Depositor | null>(store.get("Depositor", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class Transaction extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));

    this.set("type", Value.fromString(""));
    this.set("account", Value.fromBytes(Bytes.empty()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("pool", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Transaction must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Transaction", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Transaction | null {
    return changetype<Transaction | null>(
      store.get("Transaction", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}
