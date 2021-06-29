import PriceProductLessZeroException from './exceptions/price-product-less-zero.exception'
import { ExpenseID } from '../../../core/types'
//TODO TEST
export default class Expense {
  constructor(
    readonly price: number,
    readonly description: string,
    readonly paymentDate: Date,
    readonly user: string,
    readonly group: string,
    readonly id?: ExpenseID,
  ) {
    this.validatePrice()
  }

  private validatePrice(): void {
    if (this.price <= 0) {
      throw new PriceProductLessZeroException('The price product should be greater than zero')
    }
  }
}
