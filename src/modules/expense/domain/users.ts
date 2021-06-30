import { ExpenseID, UserID } from '../../../core/types'

export default class UserTmp {
  constructor(readonly name: string, readonly email: string, readonly id?: UserID) {}
}
