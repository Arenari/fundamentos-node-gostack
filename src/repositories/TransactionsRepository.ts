import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    const balance: Balance = this.transactions.reduce<Balance>(
      (currentBalance, { value, type }) => {
        const newBalance = {
          ...currentBalance,
          [type]: currentBalance[type] + value,
        };
        return newBalance;
      },
      initialBalance,
    );
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  // public getBalance(): Balance {
  //   const initialBalance: Balance = {
  //     income: 0,
  //     outcome: 0,
  //     total: 0,
  //   };
  //   const balance: Balance = this.transactions.reduce<Balance>(
  //     (currentBalance, { value, type }) => {
  //       let { income, outcome } = currentBalance;
  //       if (type === 'outcome') {
  //         outcome += value;
  //       } else {
  //         income += value;
  //       }
  //       return { income, outcome, total: 0 };
  //     },
  //     initialBalance,
  //   );
  //   balance.total = balance.income - balance.outcome;
  //   return balance;
  // }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
