import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ExpenseDomainModule } from '../domain/expenseDomain.module'
import { ExpenseSchema } from '../infrastructure/repository/schemas/expense.schema'
import ExpenseFactory from './factory/expense.factory'
import CreateExpenseUseCase from './createExpense.useCase'
import ExpenseRepositoryMongo from '../infrastructure/repository/expense.repository.mongo'
import { EXPENSE_REPOSITORY } from '../../../core/types'
import FindExpensesByGroupUseCase from './findExpensesByGroup.useCase'
import GetBalanceByGroupUseCase from './getBalanceByGroup.useCase'
import UpdateExpenseUseCase from './updateExpense.useCase'
import DeleteExpenseUseCase from './deleteExpense.useCase'

@Module({
  imports: [
    ExpenseDomainModule,
    MongooseModule.forFeature([
      {
        name: 'Expense',
        schema: ExpenseSchema,
      },
    ]),
  ],
  providers: [
    ExpenseFactory,
    CreateExpenseUseCase,
    FindExpensesByGroupUseCase,
    GetBalanceByGroupUseCase,
    UpdateExpenseUseCase,
    DeleteExpenseUseCase,
    {
      provide: EXPENSE_REPOSITORY,
      useClass: ExpenseRepositoryMongo,
    },
  ],
  exports: [
    ExpenseFactory,
    CreateExpenseUseCase,
    FindExpensesByGroupUseCase,
    GetBalanceByGroupUseCase,
    UpdateExpenseUseCase,
    DeleteExpenseUseCase,
  ],
})
export class ExpenseApplicationModule {}
