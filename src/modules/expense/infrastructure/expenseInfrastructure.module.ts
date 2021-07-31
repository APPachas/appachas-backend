import { Module } from '@nestjs/common'
import { ExpenseApplicationModule } from '../application/expenseApplication.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ExpenseSchema } from './repository/schemas/expense.schema'
import ExpenseController from './controllers/expense.controller'
import { UserApplicationModule } from '../../user/application/userApplication.module'
import { GroupApplicationModule } from '../../group/application/groupApplication.module'

@Module({
  imports: [
    ExpenseApplicationModule,
    UserApplicationModule,
    GroupApplicationModule,
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
  ],
  controllers: [ExpenseController],
})
export class ExpenseInfrastructureModule {}
