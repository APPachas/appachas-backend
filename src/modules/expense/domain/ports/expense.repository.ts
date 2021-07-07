import Expense from '../expense'
import { ExpenseID, GroupID } from '../../../../core/types'

export interface ExpenseRepository {
  create(expense: Expense): Promise<Expense>
  findByGroup(groupID: GroupID): Promise<Expense[]>
  update(id: ExpenseID, expense: Expense): Promise<Expense>
  delete(id: ExpenseID): Promise<Expense>
}
