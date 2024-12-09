// requires and imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// db connection
mongoose.connect('mongodb://localhost:27017/budget_tracker_1_db');

// routers
const budgetRouter = require('./routers/budgetRouter.js').router;
app.use('/budgets', budgetRouter);

const transactionRouter = require('./routers/transactionRouter.js').router;
app.use('/transactions', transactionRouter);

// catch all

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});