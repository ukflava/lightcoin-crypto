class Transaction {
  constructor(amounts, account) {
    this.amounts  = amounts;
    this.account = account;
  }
  commit() {
    if (!this.validate()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amounts;
  }
  validate() {
    return (this.account.balance - this.amounts >= 0);
  }
}
class Deposit extends Transaction {
  get value() {
    return this.amounts;
  }
}
class Account {
  constructor() {
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
