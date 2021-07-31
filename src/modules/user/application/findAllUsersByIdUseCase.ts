import { Inject, Injectable } from '@nestjs/common'
import { USER_REPOSITORY, UserID } from '../../../core/types'
import { UserRepository } from '../domain/ports/user.repository'
import User from '../domain/users'

@Injectable()
export default class FindAllUsersByIdUseCase {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  public handler(ids: UserID[]): Promise<User[]> {
    return this.userRepository.findAllById(ids)
  }
}
