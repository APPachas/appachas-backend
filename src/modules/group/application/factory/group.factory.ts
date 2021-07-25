import { Injectable } from '@nestjs/common'
import Group from '../../domain/group'
import { GroupBodyDto } from '../../infrastructure/controllers/groupBody.dto'
import { UserID } from '../../../../core/types'

@Injectable()
export default class GroupFactory {
  public create(group: GroupBodyDto, userId?: UserID): Group {
    if (userId) {
      group.users = group.users.indexOf(userId) === -1 ? [...group.users, userId] : group.users
    }
    return new Group(group.name, group.isClosed, group.users)
  }
}
