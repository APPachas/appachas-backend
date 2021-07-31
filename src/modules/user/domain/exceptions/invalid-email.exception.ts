/* eslint-disable @typescript-eslint/no-useless-constructor */
export default class InvalidEmailException extends Error {
  constructor(message: string) {
    super(message)
  }
}
