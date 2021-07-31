import { Inject, Injectable } from '@nestjs/common'
import { GROUP_REPOSITORY } from '../../../core/types'
import { GroupRepository } from '../domain/ports/group.repository'
import Group from '../domain/group'

@Injectable()
export default class FindAllGroupsUseCase {
  constructor(@Inject(GROUP_REPOSITORY) private groupRepository: GroupRepository) {}

  public handler(userId): Promise<Group[]> {
    return this.groupRepository.findAll(userId)
  }
}
