import { BalanceCalculator } from './balanceCalculator'
import Expense from './expense'

describe('BalanceCalculator', () => {
  it('should return an empty array if there is no expenses', () => {
    const given: Expense[] = []
    const balance = new BalanceCalculator(given)
    const actual = balance.Calculate()

    expect(actual).toEqual([])
  })
})
