import Expense from './expense'
import PriceProductLessZeroException from './exceptions/price-product-less-zero.exception'

describe('Expense', () => {
  it('should throw PriceProductLessZeroExceptio when price is less or equal to 0', () => {
    const given = {
      price: -200,
      description: 'Hola mundo',
      paymentDate: new Date(),
      user: '1',
      group: 'A',
    }

    expect(() => {
      new Expense(given.price, given.description, given.paymentDate, given.user, given.group)
    }).toThrow(PriceProductLessZeroException)
  })
})
