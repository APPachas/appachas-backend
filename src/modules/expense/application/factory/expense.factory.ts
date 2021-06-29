import { Injectable } from '@nestjs/common'
import Expense from '../../domain/expense'

@Injectable()
export default class ExpenseFactory {
  public createExpense(expense: Expense): Expense {
    return new Expense(
      '',
      expense.price,
      expense.description,
      expense.paymentDate,
      expense.user,
      expense.group,
    )
  }
}
