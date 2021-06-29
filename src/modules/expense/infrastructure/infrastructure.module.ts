import { Module } from '@nestjs/common'
import { ApplicationModule } from '../application/application.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ExpenseSchema } from './repository/schemas/expense.schema'
import ExpenseController from './controllers/expense.controller'

@Module({
  imports: [
    ApplicationModule,
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
  ],
  controllers: [ExpenseController],
})
export class InfrastructureModule {}
