// import { Transaction } from "./Transaction.js";
const { Transaction } = require('./Transaction.js');

class Budget {
    constructor() {
        this.transactions = [];
    }

    // create a transaction -> should return void
    createTransaction(amount, description, type) {
        const transaction = new Transaction(amount, description, type);
        this.transactions.push(transaction);
        // console.log(this.transactions);
    };

    // calculate total expenses -> should return a Number
    calculateTotalExpenses() {
        const allTransactions = this.transactions;
        let expenses = 0;
        allTransactions.forEach((transaction) => {
            if (transaction.type === 'expense') {
                expenses = expenses + transaction.amount;
            }
        });
        // console.log(`Your total expenses are: $${expenses}.`);
        return expenses;
    };

    // get all transactions
    get getAllTransactions() {
        console.log(this.transactions);
        return this.transactions;
    };

    // calculate total income -> should return a Number
    calculateTotalIncome() {
        const allTransactions = this.transactions;
        let totalIncome = 0;
        allTransactions.forEach((transaction) => {
            if (transaction.type === 'income') {
                totalIncome = totalIncome + transaction.amount;
            }
        });
        // console.log(`Your total income is: $${totalIncome}.`);
        return totalIncome;
    };

    // get the balance of a budget instance ( incomes - expenses ) -> return a Number
    calculateNetBalance() {
        const expenses = this.calculateTotalExpenses();
        const income = this.calculateTotalIncome();
        const netBalance = income - expenses;
        // console.log(`Your net balance is: $${netBalance}`);
        return netBalance;
    };

    // delete a transaction -> return void
    deleteTransaction(index) {
        this.transactions.splice(index, 1);
    };
};

const budget1 = new Budget();
budget1.createTransaction(54, 'cool description', 'expense');
budget1.createTransaction(9.56, 'cool description of cool stuff', 'expense');
budget1.createTransaction(137.21, 'cool description2', 'income');
budget1.createTransaction(11.45, 'cool description3', 'income');
budget1.calculateTotalExpenses();
budget1.calculateTotalIncome();
budget1.calculateNetBalance();
budget1.getAllTransactions;
budget1.deleteTransaction(0);
budget1.getAllTransactions;

// export { Budget };
module.exports = { Budget };