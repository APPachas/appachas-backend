import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DomainModule } from '../domain/domain.module'
import { ExpenseSchema } from '../infrastructure/repository/schemas/expense.schema'
import ExpenseFactory from './factory/expense.factory'
import CreateExpenseUseCase from './createExpense.usecase'

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
  providers: [ExpenseFactory, CreateExpenseUseCase],
  exports: [ExpenseFactory, CreateExpenseUseCase],
})
export class ApplicationModule {}
