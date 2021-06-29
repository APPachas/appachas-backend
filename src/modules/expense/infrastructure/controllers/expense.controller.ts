import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import CreateExpenseUseCase from '../../application/createExpense.usecase'
import Expense from '../../domain/expense'

@Controller('expenses')
export default class ExpenseController {
  constructor(private readonly createExpenseUseCase: CreateExpenseUseCase) {}

  @Post()
  public async createProduct(@Res() request, @Body() expense: Expense) {
    const expenseCreated = await this.createExpenseUseCase.handler(expense)
    return request.status(HttpStatus.CREATED).json(expenseCreated)
  }
}
