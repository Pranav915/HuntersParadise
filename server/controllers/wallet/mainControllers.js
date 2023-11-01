const getBalance = require("./getBalance");
const addFund = require("./addFund");
const withdrawFund = require("./withdrawFund");
const getTransactions = require("./getTransactions");
const completeTransaction = require("./transactionComplete");
exports.controllers = {
    getBalance,
    addFund,
    withdrawFund,
    getTransactions,
    completeTransaction
};