import { Inject, Injectable } from '@nestjs/common'
import { GROUP_REPOSITORY, GroupID } from '../../../core/types'
import { GroupRepository } from '../domain/ports/group.repository'
import Group from '../domain/group'

@Injectable()
export default class FindGroupUseCase {
  constructor(@Inject(GROUP_REPOSITORY) private groupRepository: GroupRepository) {}

  public handler(id: GroupID): Promise<Group> {
    return this.groupRepository.findOne(id)
  }
}
