import { BalanceCalculator } from './balanceCalculator'
import Expense from './expense'
import User from '../../user/domain/users'

describe('BalanceCalculator', () => {
  it('should return an empty array if there are no users', () => {
    const given: User[] = []
    const balances = new BalanceCalculator(given)
    const expenses = []
    const actual = balances.GetBalance(expenses)

    expect(actual).toEqual([])
  })

  it('should return an starting 0 balance', () => {
    const given: User[] = [...dummyUsers]
    const balances = new BalanceCalculator(given)
    const expenses = []
    const actual = balances.GetBalance(expenses)

    expect(actual).toEqual([
      { id: '1', name: 'Alejandro', balance: 0 },
      { id: '2', name: 'Marta', balance: 0 },
      { id: '3', name: 'Pedro', balance: 0 },
    ])
  })

  it('should return two users with 0 balance', () => {
    const given: User[] = dummyUsers.slice(0, 2)
    const balances = new BalanceCalculator(given)
    const expenses = dummyExpenses.slice(1, 3)
    const actual = balances.GetBalance(expenses)

    expect(actual).toEqual([
      { id: '1', name: 'Alejandro', balance: 0 },
      { id: '2', name: 'Marta', balance: 0 },
    ])
  })

  it('should return different balance for each 3 users', () => {
    const given: User[] = [...dummyUsers]
    const balances = new BalanceCalculator(given)
    const expenses = dummyExpenses.slice(1, 4)
    const actual = balances.GetBalance(expenses)

    expect(actual).toEqual([
      { id: '1', name: 'Alejandro', balance: 50 },
      { id: '2', name: 'Marta', balance: 50 },
      { id: '3', name: 'Pedro', balance: -100 },
    ])
  })

  it('should return different balance for each 2 users', () => {
    const given: User[] = dummyUsers.slice(0, 2)
    const balances = new BalanceCalculator(given)
    const expenses = [...dummySegondTest]
    const actual = balances.GetBalance(expenses)

    expect(actual).toEqual([
      { id: '1', name: 'Alejandro', balance: 325 },
      { id: '2', name: 'Marta', balance: -325 },
    ])
  })
})

const dummyUsers: User[] = [
  new User('Alejandro', 'asd@asd.com', '12345678', [], '1'),
  new User('Marta', 'asd@asd.com', '12345678', [], '2'),
  new User('Pedro', 'asd@asd.com', '12345678', [], '3'),
]

const dummyExpenses: Expense[] = [
  new Expense(100, '', new Date(), '1', '1', '1'),
  new Expense(200, '', new Date(), '1', '1', '4'),
  new Expense(200, '', new Date(), '2', '1', '2'),
  new Expense(50, '', new Date(), '3', '1', '3'),
]

const dummySegondTest: Expense[] = [
  new Expense(300, '', new Date(), '1', '1', '1'),
  new Expense(300, '', new Date(), '1', '1', '4'),
  new Expense(100, '', new Date(), '1', '1', '2'),
  new Expense(50, '', new Date(), '2', '1', '3'),
]
