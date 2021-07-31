import { GroupID, UserID } from '../../../core/types'

export default class Group {
  constructor(
    readonly name: string,
    readonly isClosed: boolean = false,
    readonly users: UserID[],
    readonly id?: GroupID,
  ) {}
}
