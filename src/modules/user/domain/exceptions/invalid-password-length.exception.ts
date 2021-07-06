/* eslint-disable @typescript-eslint/no-useless-constructor */
export default class InvalidPasswordLengthException extends Error {
  constructor(message: string) {
    super(message)
  }
}
