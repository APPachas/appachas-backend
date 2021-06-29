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

  public static toDomains(expensesEntity: ExpenseDto[]): Expense[] {
    const expenses = new Array<Expense>()
    expensesEntity.forEach(expenseEntity => {
      const expense = this.toDomain(expenseEntity)
      expenses.push(expense.get())
    })
    return expenses
  }
}
