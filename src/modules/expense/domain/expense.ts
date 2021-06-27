import PriceProductLessZeroException from './exceptions/price-product-less-zero.exception'

export default class Expense {
  private id?: string

  private readonly price: number

  private readonly description: string

  private paymentDate: Date

  private readonly user: string

  private readonly group: string

  constructor(
    id: string,
    price: number,
    description: string,
    paymentDate: Date,
    user: string,
    group: string,
  ) {
    this.id = id
    this.price = price
    this.description = description
    this.paymentDate = paymentDate
    this.user = user
    this.group = group
    this.validatePrice()
  }

  public validatePrice(): void {
    if (this.price <= 0) {
      throw new PriceProductLessZeroException('The price product should be greater than zero')
    }
  }

  public getPrice(): number {
    return this.price
  }

  public getId(): string {
    return this.id
  }

  public setPaymentDate(paymentDate: Date): this {
    this.paymentDate = paymentDate
    return this
  }
}
