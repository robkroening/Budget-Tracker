const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const budgetSchema = require('../schemas/BudgetSchema.js').Budget;
const transactionSchema = require('../schemas/TransactionSchema.js').Transaction;
const BudgetClass = require('../../classes/Budget.js').Budget;
const TransactionClass = require('../../classes/Transaction.js').Transaction;

// get all budget plans
router.get('/', async (req, res) => {
    try {
        const allBudgets = await budgetSchema.find();
        res.json(allBudgets);
    } catch (error) {
        console.log(error);
    }
});

// create a new budget plan
// need to error handle the req body
router.post('/', async (req, res) => {
    try {
        const { name, transactions } = req.body;
        const newBudget = await budgetSchema.create(new BudgetClass(name));
        res.json(newBudget);
    } catch (error) {
        console.log(error);
    }
});

// TRANSACTION LOGIC IN A BUDGET PLAN

// get all the transactions as an array for a specific budget
router.get('/:budgetId/transactions', async (req, res) => {
    try {
        const foundBudgetPlan = await budgetSchema.findById(req.params.budgetId).populate('transactions');
        res.json(foundBudgetPlan.transactions);
    } catch (error) {
        console.log(error);
    }
});

// get a specific transaction for a specific budget
router.get('/:budgetId/transactions/:transactionId', async (req, res) => {
    try {
        const foundBudgetPlan = await budgetSchema.findById(req.params.budgetId).populate('transactions');
        const transactionsArray = foundBudgetPlan.transactions;
        const transaction = transactionsArray.find(transaction => transaction._id.toString() === req.params.transactionId);
        res.json(transaction);
    } catch (error) {
        console.log(error);
    }
});

// post a new transaction to an existing budget plan
router.post('/:budgetId/transactions', async (req, res) => {
    try {
        // destructuring transaction object
        const { amount, description, type } = req.body;
        // creating new transaction by creating a new class instance first
        const transactionClass = new TransactionClass(amount, description, type);
        const newTransaction = await transactionSchema.create(transactionClass);
        // find said budget plan
        const foundBudgetPlan = await budgetSchema.findById(req.params.budgetId);
        foundBudgetPlan.transactions.push(newTransaction);
        // save new transaction to found budget plan
        await foundBudgetPlan.save();
        res.json(foundBudgetPlan);
    } catch (error) {
        console.log(error);
    }
});

// delete a transaction from an existing budget plan
router.delete('/:budgetId/transactions/:transactionId', async (req, res) => {
    try {
        const foundBudgetPlan = await budgetSchema.findById(req.params.budgetId);
        const transactionsArray = foundBudgetPlan.transactions;
        const indexToDelete = transactionsArray.findIndex(transaction => transaction._id.toString() === req.params.transactionId);
        if (indexToDelete === -1) {
            const error = new Error();
            error.message = 'This transaction was not found'
            error.status = 400;
            throw error;
        }
        foundBudgetPlan.transactions.splice(indexToDelete, 1);
        await foundBudgetPlan.save();
        res.json(foundBudgetPlan);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

module.exports = { router };