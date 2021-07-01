import { Inject, Injectable } from '@nestjs/common'
import { ExpenseRepository } from '../domain/ports/expense.repository'
import { Optional } from 'typescript-optional'
import Expense from '../domain/expense'
import { EXPENSE_REPOSITORY } from '../../../core/types'

@Injectable()
export default class CreateExpenseUseCase {
  constructor(@Inject(EXPENSE_REPOSITORY) private expenseRepository: ExpenseRepository) {}

  public handler(expense: Expense): Promise<Optional<Expense>> {
    return this.expenseRepository.createExpense(expense)
  }
}
