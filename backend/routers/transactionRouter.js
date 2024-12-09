const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const budgetSchema = require('../schemas/BudgetSchema.js').Budget;
const transactionSchema = require('../schemas/TransactionSchema.js').Transaction;
const BudgetClass = require('../../classes/Budget.js').Budget;
const TransactionClass = require('../../classes/Transaction.js').Transaction;

// get all transactions
router.get('/', async (req, res) => {
    try {
        const allTransactions = await transactionSchema.find();
        res.json(allTransactions);
    } catch (error) {
        console.log(error);
    }
});

// get single transaction by id
router.get('/:transactionId', async (req, res) => {
    try {
        const transaction = await transactionSchema.findById(req.params.transactionId);
        res.json(transaction);
    } catch (error) {
        console.log(error);
    }
});

// post a transaction
router.post('/', async (req, res) => {
    try {
        const { amount, description, type, date } = req.body;
        const transaction = new TransactionClass(amount, description, type);
        const newTransaction = await transactionSchema.create(transaction);
        res.json(newTransaction);
    } catch (error) {
        console.log(error);
    }
});

// delete a transaction
router.delete('/:transactionId', async (req, res) => {
    try {
        const transactionId = req.params.transactionId;
        const deletedTransaction = await transactionSchema.findByIdAndDelete(transactionId);
        res.json(deletedTransaction);
    } catch (error) {
        console.log(error);
    }
});

module.exports = { router };