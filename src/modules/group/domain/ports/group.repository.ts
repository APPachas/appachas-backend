import { GroupID } from '../../../../core/types'
import Group from '../group'

export interface GroupRepository {
  create(group: Group): Promise<Group>
  findAll(groupId: GroupID): Promise<Group[]>
  findOne(id: GroupID): Promise<Group>
  update(groupId: string, user: Group): Promise<Group>
  delete(groupId: GroupID): Promise<Group>
}
