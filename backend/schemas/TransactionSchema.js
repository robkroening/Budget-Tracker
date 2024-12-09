const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: false
        }
    }, 
    
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction };