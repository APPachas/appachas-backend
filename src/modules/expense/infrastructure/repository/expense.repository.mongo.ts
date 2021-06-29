import { Injectable } from '@nestjs/common'
import { ExpenseRepository } from '../../domain/ports/expense.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import Expense from '../../domain/expense'
import { Optional } from 'typescript-optional'
import ExpenseMapper from '../mappers/expense.mapper'
import { ExpenseDto } from './schemas/expense.schema'

@Injectable()
export default class ExpenseRepositoryMongo implements ExpenseRepository {
  constructor(@InjectModel('Expense') private readonly expenseModel: Model<ExpenseDto>) {}

  public async createExpense(expense: Expense): Promise<Optional<Expense>> {
    let expenseCreated = new this.expenseModel(expense)
    expenseCreated = await expenseCreated.save()
    return ExpenseMapper.toDomain(expenseCreated)
  }
}
