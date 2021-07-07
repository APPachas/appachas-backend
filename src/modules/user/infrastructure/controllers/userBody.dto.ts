import { GroupID, UserID } from '../../../../core/types'

export interface UserBodyDto {
  name: string
  email: string
  password: string
  groups: GroupID[]
  id?: UserID
}
