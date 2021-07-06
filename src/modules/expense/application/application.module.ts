import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DomainModule } from '../domain/domain.module'
import { ExpenseSchema } from '../infrastructure/repository/schemas/expense.schema'
import ExpenseFactory from './factory/expense.factory'
import CreateExpenseUseCase from './createExpense.useCase'
import ExpenseRepositoryMongo from '../infrastructure/repository/expense.repository.mongo'
import { EXPENSE_REPOSITORY } from '../../../core/types'
import FindExpensesByGroupUseCase from './findExpensesByGroup.useCase'

@Module({
  imports: [
    DomainModule,
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
    {
      provide: EXPENSE_REPOSITORY,
      useClass: ExpenseRepositoryMongo,
    },
  ],
  exports: [ExpenseFactory, CreateExpenseUseCase, FindExpensesByGroupUseCase],
})
export class ApplicationModule {}
