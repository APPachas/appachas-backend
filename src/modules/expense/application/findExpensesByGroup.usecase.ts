import { Inject, Injectable } from '@nestjs/common'
import { ExpenseRepository } from '../domain/ports/expense.repository'
import Expense from '../domain/expense'
import { EXPENSE_REPOSITORY, GroupID } from '../../../core/types'

@Injectable()
export default class FindExpensesByGroupUseCase {
  constructor(@Inject(EXPENSE_REPOSITORY) private expenseRepository: ExpenseRepository) {}

  public handler(groupID: GroupID): Promise<Expense[]> {
    return this.expenseRepository.findExpenseByGroup(groupID)
  }
}
