import { UserID } from '../../../core/types'
import InvalidEmailException from './exceptions/invalid-email.exception'
import InvalidPasswordLengthException from './exceptions/invalid-password-length.exception'

export default class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly id?: UserID,
  ) {
    this.validateEmail(email)
    this.validatePassword(password)
  }

  private validateEmail(email: string): void {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    if (!regexp.test(email)) {
      throw new InvalidEmailException('The email is not valid')
    }
  }

  private validatePassword(password: string) {
    this.isValidPasswordLength(password)
  }

  private isValidPasswordLength(password: string): void {
    const requiredLength = 8
    if (password.length < requiredLength) {
      throw new InvalidPasswordLengthException('The password must have at least 8 character')
    }
  }
}
