import UserTmp from './users'
import Expense from './expense'

class UserBalance {
  constructor(public readonly id, public readonly name, public balance) {}
}

export class BalanceCalculator {
  private userBalances: UserBalance[] = []
  constructor(users: UserTmp[]) {
    users.forEach(user => {
      const newUserBalance = new UserBalance(user.id, user.name, 0)
      this.userBalances = [...this.userBalances, newUserBalance]
    })
  }

  Calculate(expenses: Expense[]): UserBalance[] {
    if (expenses.length < 1) return this.userBalances
    this.ResetBalance()
    const initialBalance = 0
    const totalExpenses = expenses.reduce(
      (total, currentExpense) => total - currentExpense.price,
      initialBalance,
    )
    const initialBalancePerUser = totalExpenses / this.userBalances.length

    this.userBalances.forEach(userBalance => {
      userBalance.balance = expenses.reduce(
        (total, currentExpense) =>
          currentExpense.user === userBalance.id ? total + currentExpense.price : total,
        initialBalancePerUser,
      )
    })
    return this.userBalances
  }

  ResetBalance(): void {
    this.userBalances.forEach(userBalance => (userBalance.balance = 0))
  }
}
