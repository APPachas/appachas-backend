import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common'
import CreateExpenseUseCase from '../../application/createExpense.usecase'
import { ExpenseResponseDto } from './expenseResponse.dto'
import Expense from '../../domain/expense'
import { GroupID } from '../../../../core/types'
import FindExpensesByGroupUseCase from '../../application/findExpensesByGroup.usecase'

@Controller('expenses')
export default class ExpenseController {
  constructor(
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly findExpenseByGroupUseCase: FindExpensesByGroupUseCase,
  ) {}

  @Post()
  async createExpense(@Res() request, @Body() expenseBody: Expense): Promise<ExpenseResponseDto> {
    const expenseCreated = await this.createExpenseUseCase.handler(expenseBody)
    return request.status(HttpStatus.CREATED).json(expenseCreated)
  }

  @Get('group/:groupID')
  async findExpensesByGroup(@Res() request, @Param('groupID') groupID: GroupID) {
    const expenses = await this.findExpenseByGroupUseCase.handler(groupID)
    return request.status(HttpStatus.OK).json(expenses)
  }
}
