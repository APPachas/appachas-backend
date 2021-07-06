import { Inject, Injectable } from '@nestjs/common'
import { USER_REPOSITORY, UserID } from '../../../core/types'
import { UserRepository } from '../domain/ports/user.repository'
import User from '../domain/users'

@Injectable()
export default class FindUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  public handler(id: UserID): Promise<User> {
    return this.userRepository.findOne(id)
  }
}
