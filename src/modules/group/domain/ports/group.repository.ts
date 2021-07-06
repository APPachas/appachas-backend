import { GroupID } from '../../../../core/types'
import Group from '../group'

export interface GroupRepository {
  create(user: Group): Promise<Group>
  findAll(): Promise<Group[]>
  findOne(id: GroupID): Promise<Group>
  update(id: string, user: Group): Promise<Group>
  delete(id: GroupID): Promise<Group>
}
