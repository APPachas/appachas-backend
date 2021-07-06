import { Injectable } from '@nestjs/common'
import Group from '../../domain/group'
import { GroupBodyDto } from '../../infrastructure/controllers/groupBody.dto'

@Injectable()
export default class GroupFactory {
  public create(group: GroupBodyDto): Group {
    return new Group(group.name, group.users)
  }
}
