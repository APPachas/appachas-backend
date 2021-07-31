import { Inject, Injectable } from '@nestjs/common'
import { ExpenseRepository } from '../domain/ports/expense.repository'
import Expense from '../domain/expense'
import { EXPENSE_REPOSITORY } from '../../../core/types'

@Injectable()
export default class CreateExpenseUseCase {
  constructor(@Inject(EXPENSE_REPOSITORY) private expenseRepository: ExpenseRepository) {}

  public handler(expense: Expense): Promise<Expense> {
    return this.expenseRepository.create(expense)
  }
}
