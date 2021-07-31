import { Inject, Injectable } from '@nestjs/common'
import { ExpenseRepository } from '../domain/ports/expense.repository'
import { EXPENSE_REPOSITORY, GroupID } from '../../../core/types'
import { BalanceCalculator, UserBalance } from '../domain/balanceCalculator'
import User from '../../user/domain/users'

@Injectable()
export default class GetBalanceByGroupUseCase {
  constructor(@Inject(EXPENSE_REPOSITORY) private expenseRepository: ExpenseRepository) {}

  public async handler(id: GroupID, users: User[]): Promise<UserBalance[]> {
    const expenses = await this.expenseRepository.findByGroup(id)
    const balance = new BalanceCalculator(users)
    return balance.GetBalance(expenses)
  }
}
