import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common'
import CreateExpenseUseCase from '../../application/createExpense.useCase'
import { ExpenseResponseDto } from './expenseResponse.dto'
import { GroupID } from '../../../../core/types'
import FindExpensesByGroupUseCase from '../../application/findExpensesByGroup.useCase'
import ExpenseFactory from '../../application/factory/expense.factory'
import { ExpenseBodyDto } from './expenseBody.dto'
import GetBalanceByGroupUseCase from '../../application/getBalanceByGroup.useCase'
import FindAllUsersByGroupUseCase from '../../../user/application/findAllUsersByGroup.useCase'

@Controller('expenses')
export default class ExpenseController {
  constructor(
    private expenseFactory: ExpenseFactory,
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly findExpenseByGroupUseCase: FindExpensesByGroupUseCase,
    private readonly getBalanceByGroupUseCase: GetBalanceByGroupUseCase,
    private readonly findAllUsersByGroupUseCase: FindAllUsersByGroupUseCase,
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

  @Get('/balance')
  async getBalanceByGroup(@Res() request, @Query('group') id: GroupID) {
    const users = await this.findAllUsersByGroupUseCase.handler(id)
    const balance = await this.getBalanceByGroupUseCase.handler(id, users)
    return request.status(HttpStatus.OK).json(balance)
  }
}
