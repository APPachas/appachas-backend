import { Injectable } from '@nestjs/common'
import Group from '../../domain/group'
import { GroupBodyDto } from '../../infrastructure/controllers/groupBody.dto'
import { UserID } from '../../../../core/types'

@Injectable()
export default class GroupFactory {
  public create(group: GroupBodyDto, userId?: UserID): Group {
    if (userId) {
      if (group.users !== undefined) {
        group.users = group.users.indexOf(userId) === -1 ? [...group.users, userId] : group.users
      } else {
        group.users = [userId]
      }
    }
    return new Group(group.name, group.isClosed, group.users)
  }
}
