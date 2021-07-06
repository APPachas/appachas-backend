import { GroupID } from '../../../core/types'

export default class Group {
  constructor(
    readonly name: string,
    readonly users: string[],
    readonly isClosed: boolean = false,
    readonly id?: GroupID,
  ) {}
}
