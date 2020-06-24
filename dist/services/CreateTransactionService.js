"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, type = _a.type, value = _a.value;
        if (type !== 'outcome' && type !== 'income') {
            throw Error('Tipo de transação inválida');
        }
        var total = this.transactionsRepository.getBalance().total;
        if (type === 'outcome') {
            if (total < value) {
                throw Error('Valor maior do que o total em caixa');
            }
        }
        var newTransaction = this.transactionsRepository.create({
            title: title,
            type: type,
            value: value,
        });
        return newTransaction;
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
