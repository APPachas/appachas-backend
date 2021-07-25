import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common'
import CreateExpenseUseCase from '../../application/createExpense.useCase'
import { ExpenseResponseDto } from './expenseResponse.dto'
import { ExpenseID, GroupID } from '../../../../core/types'
import FindExpensesByGroupUseCase from '../../application/findExpensesByGroup.useCase'
import ExpenseFactory from '../../application/factory/expense.factory'
import { ExpenseBodyDto } from './expenseBody.dto'
import GetBalanceByGroupUseCase from '../../application/getBalanceByGroup.useCase'
import FindAllUsersByGroupUseCase from '../../../user/application/findAllUsersByGroup.useCase'
import { Response } from 'express'
import UpdateExpenseUseCase from '../../application/updateExpense.useCase'
import DeleteExpenseUseCase from '../../application/deleteExpense.useCase'
import { JwtAuthGuard } from '../../../auth/infrastructure/jwt-auth.guard'

@Controller('expenses')
export default class ExpenseController {
  constructor(
    private expenseFactory: ExpenseFactory,
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly findExpenseByGroupUseCase: FindExpensesByGroupUseCase,
    private readonly getBalanceByGroupUseCase: GetBalanceByGroupUseCase,
    private readonly findAllUsersByGroupUseCase: FindAllUsersByGroupUseCase,
    private readonly updateExpenseUseCase: UpdateExpenseUseCase,
    private readonly deleteExpenseUseCase: DeleteExpenseUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createExpense(
    @Res() response,
    @Body() expenseBody: ExpenseBodyDto,
  ): Promise<ExpenseResponseDto> {
    const expense = this.expenseFactory.create(expenseBody)
    const expenseCreated = await this.createExpenseUseCase.handler(expense)
    return response.status(HttpStatus.CREATED).json(expenseCreated)
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findExpensesByGroup(@Res() response, @Query('group') groupID: GroupID) {
    const expenses = await this.findExpenseByGroupUseCase.handler(groupID)
    return response.status(HttpStatus.OK).json(expenses)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/balance')
  async getBalanceByGroup(@Res() request, @Query('group') id: GroupID) {
    const users = await this.findAllUsersByGroupUseCase.handler(id)
    const balance = await this.getBalanceByGroupUseCase.handler(id, users)
    return request.status(HttpStatus.OK).json(balance)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: ExpenseID,
    @Body() expenseBody: ExpenseBodyDto,
  ) {
    const expense = this.expenseFactory.create(expenseBody)
    const expenseUpdated = await this.updateExpenseUseCase.handler(id, expense)
    if (expenseUpdated === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(expenseUpdated)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Res() res: Response, @Param('id') id: ExpenseID) {
    const expense = await this.deleteExpenseUseCase.handler(id)
    if (expense === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(expense)
  }
}
