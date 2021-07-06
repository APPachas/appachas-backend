import { Inject, Injectable } from '@nestjs/common'
import { USER_REPOSITORY } from '../../../core/types'
import { UserRepository } from '../domain/ports/user.repository'
import User from '../domain/users'

@Injectable()
export default class UpdateUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  public handler(id: string, user: User): Promise<User> {
    return this.userRepository.updateUser(id, user)
  }
}
