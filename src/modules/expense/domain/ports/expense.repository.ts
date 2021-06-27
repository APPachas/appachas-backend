import { Optional } from 'typescript-optional'
import Expense from '../expense'

export interface ExpenseRepository {
  findAll(): Promise<Expense[]>

  findOne(id: string): Promise<Optional<Expense>>

  create(product: Expense): Promise<Optional<Expense>>

  delete(productId: string): Promise<Optional<Expense>>

  update(expenseId: string, expense: Expense): Promise<Optional<Expense>>
}
