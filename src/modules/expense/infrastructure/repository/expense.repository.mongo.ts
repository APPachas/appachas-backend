import { Injectable } from '@nestjs/common'
import { ExpenseRepository } from '../../domain/ports/expense.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import Expense from '../../domain/expense'
import ExpenseMapper from '../mappers/expense.mapper'
import { ExpenseDto } from './schemas/expense.schema'
import { ExpenseID, GroupID } from '../../../../core/types'

@Injectable()
export default class ExpenseRepositoryMongo implements ExpenseRepository {
  constructor(@InjectModel('Expense') private readonly expenseModel: Model<ExpenseDto>) {}

  async create(expense: Expense): Promise<Expense> {
    let expenseCreated = new this.expenseModel(expense)
    expenseCreated = await expenseCreated.save()
    return ExpenseMapper.toDomain(expenseCreated)
  }

  async findByGroup(groupID: GroupID): Promise<Expense[]> {
    const expenses = await this.expenseModel.find({ group: groupID }).exec()
    return ExpenseMapper.toDomains(expenses)
  }

  async update(id: ExpenseID, expense: Expense): Promise<Expense | null> {
    const expenseUpdated = await this.expenseModel
      .findByIdAndUpdate(id, expense, { new: true })
      .exec()
    return expenseUpdated !== null ? ExpenseMapper.toDomain(expenseUpdated) : null
  }

  async delete(id: ExpenseID): Promise<Expense | null> {
    const expenseDeleted = await this.expenseModel.findByIdAndDelete(id).exec()
    return expenseDeleted !== null ? ExpenseMapper.toDomain(expenseDeleted) : null
  }
}
