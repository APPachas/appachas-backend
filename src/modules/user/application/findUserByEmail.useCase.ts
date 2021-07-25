import { Inject, Injectable } from '@nestjs/common'
import { USER_REPOSITORY } from '../../../core/types'
import { UserRepository } from '../domain/ports/user.repository'
import User from '../domain/users'

@Injectable()
export default class FindUserByEmailUseCase {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  public handler(email: string): Promise<User> {
    return this.userRepository.findOneByEmail(email)
  }
}
