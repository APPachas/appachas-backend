import { UserID } from '../../../../core/types'
import User from '../users'

export interface UserRepository {
  createUser(user: User): Promise<User>
  findAllUsers(): Promise<User[]>
  findUser(id: UserID): Promise<User>
  updateUser(id: string, user: User): Promise<User>
  deleteUser(id: UserID): Promise<User>
}
