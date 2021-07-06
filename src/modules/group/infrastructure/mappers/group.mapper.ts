import Group from '../../domain/group'
import { GroupDto } from '../repository/schemas/group.schema'

export default class GroupMapper {
  public static toDomain(groupEntity: GroupDto): Group {
    return new Group(groupEntity.name, groupEntity.users, groupEntity.isClosed, groupEntity.id)
  }

  static toDomains(groupsEntity: GroupDto[]): Group[] {
    const groups = new Array<Group>()
    groupsEntity.forEach(groupEntity => {
      const group = this.toDomain(groupEntity)
      groups.push(group)
    })
    return groups
  }
}
