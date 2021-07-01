import { UserID } from '../../../core/types'

export default class User {
  constructor(readonly name: string, readonly email: string, readonly id?: UserID) {}
}
