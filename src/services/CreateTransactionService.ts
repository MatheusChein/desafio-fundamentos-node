import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    if (type !== 'outcome' && type !== 'income') {
      throw Error('Tipo de transação inválida');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (total < value) {
        throw Error('Valor maior do que o total em caixa');
      }
    }

    const newTransaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
