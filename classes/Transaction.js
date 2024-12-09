
class Transaction {
    constructor(amount, description, type) {
        if (isNaN(amount) || amount === null) {
            throw new Error('Type must be a number');
        } else {
            this.amount = amount;
        }

        this.description = description;

        if (type !== 'income' && type !== 'expense') {
            throw new Error('Type must be an expense or income');
        } else {
            this.type = type;
        }

        this.date = new Date();
    }
    // methods needed for transaction class
};

// export { Transaction };
module.exports = { Transaction };