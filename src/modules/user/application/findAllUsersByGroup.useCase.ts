import { Inject, Injectable } from '@nestjs/common'
import { GroupID, USER_REPOSITORY } from '../../../core/types'
import { UserRepository } from '../domain/ports/user.repository'
import User from '../domain/users'

@Injectable()
export default class FindAllUsersByGroupUseCase {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  public handler(id: GroupID): Promise<User[]> {
    return this.userRepository.findAllByGroup(id)
  }
}
