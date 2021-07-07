import { Module } from '@nestjs/common'
import { ExpenseDomainModule } from './domain/expenseDomain.module'
import { ExpenseInfrastructureModule } from './infrastructure/expenseInfrastructure.module'
import { ExpenseApplicationModule } from './application/expenseApplication.module'

@Module({
  imports: [ExpenseDomainModule, ExpenseInfrastructureModule, ExpenseApplicationModule],
})
export class ExpenseModule {}
