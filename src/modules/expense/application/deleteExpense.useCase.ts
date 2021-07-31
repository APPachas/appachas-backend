import { Inject, Injectable } from '@nestjs/common'
import { EXPENSE_REPOSITORY, ExpenseID } from '../../../core/types'
import { ExpenseRepository } from '../domain/ports/expense.repository'
import Expense from '../domain/expense'

@Injectable()
export default class DeleteExpenseUseCase {
  constructor(@Inject(EXPENSE_REPOSITORY) private expenseRepository: ExpenseRepository) {}

  public handler(id: ExpenseID): Promise<Expense> {
    return this.expenseRepository.delete(id)
  }
}
