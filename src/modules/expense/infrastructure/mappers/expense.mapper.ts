import Expense from '../../domain/expense'
import { ExpenseDto } from '../repository/schemas/expense.schema'

export default class ExpenseMapper {
  public static toDomain(expenseEntity: ExpenseDto): Expense {
    return new Expense(
      expenseEntity.price,
      expenseEntity.description,
      expenseEntity.paymentDate,
      expenseEntity.user,
      expenseEntity.group,
      expenseEntity.id,
    )
  }

  static toDomains(expensesEntity: ExpenseDto[]): Expense[] {
    const expenses = new Array<Expense>()
    expensesEntity.forEach(expenseEntity => {
      const expense = this.toDomain(expenseEntity)
      expenses.push(expense)
    })
    return expenses
  }
}
