import { Inject, Injectable } from '@nestjs/common'
import ExpenseFactory from './factory/expense.factory'
import { ExpenseRepository } from '../domain/ports/expense.repository'
import { Optional } from 'typescript-optional'
import Expense from '../domain/expense'

//TODO SACAR A FICHERO APARTE
const EXPENSE_REPOSITORY = 'ExpenseRepository'

@Injectable()
export default class CreateExpenseUseCase {
  constructor(
    @Inject(EXPENSE_REPOSITORY) private expenseRepository: ExpenseRepository,
    private expenseFactory: ExpenseFactory,
  ) {}

  public handler(expense: Expense): Promise<Optional<Expense>> {
    const newExpense = this.expenseFactory.createExpense(expense)
    return this.expenseRepository.createExpense(newExpense)
  }
}
