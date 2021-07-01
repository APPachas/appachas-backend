import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common'
import CreateExpenseUseCase from '../../application/createExpense.usecase'
import { ExpenseResponseDto } from './expenseResponse.dto'
import { GroupID } from '../../../../core/types'
import FindExpensesByGroupUseCase from '../../application/findExpensesByGroup.usecase'
import ExpenseFactory from '../../application/factory/expense.factory'
import { ExpenseBodyDto } from './expenseBody.dto'

@Controller('expenses')
export default class ExpenseController {
  constructor(
    private expenseFactory: ExpenseFactory,
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly findExpenseByGroupUseCase: FindExpensesByGroupUseCase,
  ) {}

  @Post()
  async createExpense(
    @Res() request,
    @Body() expenseBody: ExpenseBodyDto,
  ): Promise<ExpenseResponseDto> {
    const expense = this.expenseFactory.createExpense(expenseBody)
    const expenseCreated = await this.createExpenseUseCase.handler(expense)
    return request.status(HttpStatus.CREATED).json(expenseCreated)
  }

  @Get('')
  async findExpensesByGroup(@Res() request, @Query('group') groupID: GroupID) {
    const expenses = await this.findExpenseByGroupUseCase.handler(groupID)
    return request.status(HttpStatus.OK).json(expenses)
  }
}
