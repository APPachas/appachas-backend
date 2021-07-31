import { UserID } from '../../../../core/types'

export interface GroupBodyDto {
  name: string
  isClosed: boolean
  users: UserID[]
  id?: string
}
