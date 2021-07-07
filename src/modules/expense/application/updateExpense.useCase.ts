import { Inject, Injectable } from '@nestjs/common'
import { EXPENSE_REPOSITORY, ExpenseID } from '../../../core/types'
import { ExpenseRepository } from '../domain/ports/expense.repository'
import Expense from '../domain/expense'

@Injectable()
export default class UpdateExpenseUseCase {
  constructor(@Inject(EXPENSE_REPOSITORY) private expenseRepository: ExpenseRepository) {}

  public handler(id: ExpenseID, expense: Expense) {
    return this.expenseRepository.update(id, expense)
  }
}
