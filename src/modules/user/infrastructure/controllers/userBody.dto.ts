import { UserID } from '../../../../core/types'

export interface UserBodyDto {
  name: string
  email: string
  password: string
  id?: UserID
}
