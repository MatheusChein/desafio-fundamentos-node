"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var totalIncome = this.transactions
            .filter(function (transaction) { return transaction.type === 'income'; })
            .map(function (transaction) { return transaction.value; })
            .reduce(function (total, current) { return total + current; }, 0);
        var totalOutcome = this.transactions
            .filter(function (transaction) { return transaction.type === 'outcome'; })
            .map(function (transaction) { return transaction.value; })
            .reduce(function (total, current) { return total + current; }, 0);
        var totalResult = totalIncome - totalOutcome;
        var balance = {
            income: totalIncome,
            outcome: totalOutcome,
            total: totalResult,
        };
        return balance;
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1.default({ title: title, value: value, type: type });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
