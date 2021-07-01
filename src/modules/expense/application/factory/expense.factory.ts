import { Injectable } from '@nestjs/common'
import Expense from '../../domain/expense'
import { ExpenseBodyDto } from '../../infrastructure/controllers/expenseBody.dto'

@Injectable()
export default class ExpenseFactory {
  public createExpense(expense: ExpenseBodyDto): Expense {
    return new Expense(
      expense.price,
      expense.description,
      expense.paymentDate,
      expense.user,
      expense.group,
      '',
    )
  }
}
