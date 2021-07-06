import { UserID } from '../../../../core/types'
import User from '../users'

export interface UserRepository {
  create(user: User): Promise<User>
  findAll(): Promise<User[]>
  findOne(id: UserID): Promise<User>
  update(id: UserID, user: User): Promise<User>
  delete(id: UserID): Promise<User>
}
