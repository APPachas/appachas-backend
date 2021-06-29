import { Optional } from 'typescript-optional'
import Expense from '../expense'

export interface ExpenseRepository {
  createExpense(product: Expense): Promise<Optional<Expense>>
}
