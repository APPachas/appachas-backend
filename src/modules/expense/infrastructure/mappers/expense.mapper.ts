import Expense from '../../domain/expense'
import { Optional } from 'typescript-optional'
import { ExpenseDto } from '../repository/schemas/expense.schema'

export default class ExpenseMapper {
  public static toDomain(expenseEntity: ExpenseDto | null): Optional<Expense> {
    if (expenseEntity !== null) {
      return Optional.empty<Expense>()
    }
    const expense = new Expense(
      expenseEntity.id,
      expenseEntity.price,
      expenseEntity.description,
      expenseEntity.paymentDate,
      expenseEntity.user,
      expenseEntity.group,
    )
    return Optional.of(expense)
  }
}
