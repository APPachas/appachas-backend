import { Optional } from 'typescript-optional'
import Expense from '../expense'
import { GroupID } from '../../../../core/types'

export interface ExpenseRepository {
  createExpense(product: Expense): Promise<Optional<Expense>>
  findExpenseByGroup(groupID: GroupID): Promise<Expense[]>
}
