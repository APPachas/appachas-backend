import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DomainModule } from '../domain/domain.module'
import { ExpenseSchema } from '../infrastructure/repository/schemas/expense.schema'
import ExpenseFactory from './factory/expense.factory'
import CreateExpenseUseCase from './createExpense.usecase'
import ExpenseRepositoryMongo from '../infrastructure/repository/expense.repository.mongo'

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
    {
      provide: 'ExpenseRepository',
      useClass: ExpenseRepositoryMongo,
    },
  ],
  exports: [ExpenseFactory, CreateExpenseUseCase],
})
export class ApplicationModule {}
