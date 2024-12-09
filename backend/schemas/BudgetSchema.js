const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    }, 
    
    { timestamps: true }
);

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = { Budget };