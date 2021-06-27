import { Injectable } from '@nestjs/common'
import Expense from '../../domain/expense'
import ExpenseCommand from '../commands/expense.commands'

@Injectable()
export default class ExpenseFactory {
  public createProduct(expenseCommand: ExpenseCommand): Expense {
    return new Expense(
      '',
      expenseCommand.price,
      expenseCommand.description,
      expenseCommand.paymentDate,
      expenseCommand.user,
      expenseCommand.group,
    )
  }
}
