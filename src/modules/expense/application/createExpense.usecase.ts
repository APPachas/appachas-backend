import { Inject, Injectable } from '@nestjs/common'
import ExpenseFactory from './factory/expense.factory'
import { ExpenseRepository } from '../domain/ports/expense.repository'
import ExpenseCommand from './commands/expense.commands'
import { Optional } from 'typescript-optional'
import Expense from '../domain/expense'

@Injectable()
export default class CreateExpenseUseCase {
  constructor(
    @Inject('ExpenseRepository') private expenseRepository: ExpenseRepository,
    private expenseFactory: ExpenseFactory,
  ) {}

  public handler(expenseCommand: ExpenseCommand): Promise<Optional<Expense>> {
    const expense = this.expenseFactory.createProduct(expenseCommand)
    return this.expenseRepository.create(expense)
  }
}
