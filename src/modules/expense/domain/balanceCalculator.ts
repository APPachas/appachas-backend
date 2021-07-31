import User from '../../user/domain/users'
import Expense from './expense'

export class UserBalance {
  constructor(public readonly id: string, public readonly name: string, public balance: number) {}
}

export class BalanceCalculator {
  private userBalances: UserBalance[] = []
  constructor(users: User[]) {
    users.forEach(user => {
      const newUserBalance = new UserBalance(user.id, user.name, 0)
      this.userBalances = [...this.userBalances, newUserBalance]
    })
  }

  GetBalance(expenses: Expense[]): UserBalance[] {
    this.ResetBalance()
    if (expenses.length < 1) return this.userBalances

    const initialBalancePerUser = this.GetInitialBalancePerUser(expenses)

    this.userBalances.forEach(userBalance => {
      userBalance.balance = expenses.reduce((total, currentExpense: Expense) => {
        return currentExpense.user.toString() === userBalance.id
          ? total + currentExpense.price
          : total
      }, initialBalancePerUser)
    })
    return this.userBalances
  }

  private GetInitialBalancePerUser(expenses: Expense[]): number {
    const initialBalance = 0
    const totalExpenses = expenses.reduce(
      (total, currentExpense) => total - currentExpense.price,
      initialBalance,
    )

    return totalExpenses / this.userBalances.length
  }

  private ResetBalance(): void {
    this.userBalances.forEach(userBalance => (userBalance.balance = 0))
  }
}
